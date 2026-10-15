export type VNodeChild = VNode | string | number | boolean | null | undefined;

export interface VNode {
  type: string | Function;
  props: Record<string, any>;
  children: VNode[];
  key?: string | number | null;
}

export const Fragment = Symbol.for('react.fragment');

function flattenChildren(raw: any[], out: VNode[] = []): VNode[] {
  for (let i = 0; i < raw.length; i++) {
    const item = raw[i];
    if (Array.isArray(item)) {
      flattenChildren(item, out);
    } else if (item === null || item === undefined || typeof item === 'boolean') {
      continue;
    } else if (typeof item === 'string' || typeof item === 'number') {
      out.push({
        type: '#text',
        props: { nodeValue: String(item) },
        children: []
      });
    } else {
      out.push(item);
    }
  }
  return out;
}

export function createElement(
  type: any,
  props: Record<string, any> | null,
  ...rawChildren: any[]
): VNode {
  const normalizedProps: Record<string, any> = props ? { ...props } : {};
  const children = flattenChildren(rawChildren);
  const key = normalizedProps.key !== undefined ? normalizedProps.key : null;
  normalizedProps.children = children;
  return {
    type,
    props: normalizedProps,
    children,
    key
  };
}

interface HookInstance {
  hooks: any[];
  effects: Array<{ callback: () => void | (() => void); deps?: any[]; cleanup?: (() => void) | void; needsRun?: boolean }>;
}

const componentInstances = new Map<string, HookInstance>();
let activeInstancePaths = new Set<string>();
let currentInstanceKey = '';
let currentHookIndex = 0;
let currentHostRoot: HTMLElement | null = null;
let currentRootVNode: (() => VNode) | null = null;
let isRenderScheduled = false;
let currentRenderedTree: ExpandedVNode | null = null;

interface ExpandedVNode {
  type: string;
  props: Record<string, any>;
  children: ExpandedVNode[];
  key?: string | number | null;
  dom?: Node | null;
  listeners?: Record<string, EventListener>;
}

function getOrCreateInstance(key: string): HookInstance {
  let inst = componentInstances.get(key);
  if (!inst) {
    inst = { hooks: [], effects: [] };
    componentInstances.set(key, inst);
  }
  return inst;
}

function depsChanged(oldDeps?: any[], newDeps?: any[]): boolean {
  if (!oldDeps || !newDeps) return true;
  if (oldDeps.length !== newDeps.length) return true;
  for (let i = 0; i < oldDeps.length; i++) {
    if (!Object.is(oldDeps[i], newDeps[i])) return true;
  }
  return false;
}

export function useState<T>(initialValue: T | (() => T)): [T, (next: T | ((prev: T) => T)) => void] {
  const instKey = currentInstanceKey;
  const hookIdx = currentHookIndex++;
  const inst = getOrCreateInstance(instKey);

  if (inst.hooks.length <= hookIdx) {
    const init = typeof initialValue === 'function' ? (initialValue as () => T)() : initialValue;
    inst.hooks[hookIdx] = init;
  }

  const setState = (next: T | ((prev: T) => T)) => {
    const targetInst = componentInstances.get(instKey);
    if (!targetInst) return;
    const prevVal = targetInst.hooks[hookIdx];
    const nextVal = typeof next === 'function' ? (next as (prev: T) => T)(prevVal) : next;
    if (!Object.is(prevVal, nextVal)) {
      targetInst.hooks[hookIdx] = nextVal;
      scheduleRerender();
    }
  };

  return [inst.hooks[hookIdx] as T, setState];
}

export function useRef<T>(initialValue: T): { current: T } {
  const inst = getOrCreateInstance(currentInstanceKey);
  const hookIdx = currentHookIndex++;
  if (inst.hooks.length <= hookIdx) {
    inst.hooks[hookIdx] = { current: initialValue };
  }
  return inst.hooks[hookIdx];
}

export function useMemo<T>(factory: () => T, deps: any[]): T {
  const inst = getOrCreateInstance(currentInstanceKey);
  const hookIdx = currentHookIndex++;
  const prev = inst.hooks[hookIdx];
  if (!prev || depsChanged(prev.deps, deps)) {
    const value = factory();
    inst.hooks[hookIdx] = { value, deps };
    return value;
  }
  return prev.value;
}

export function useCallback<T extends Function>(callback: T, deps: any[]): T {
  return useMemo(() => callback, deps);
}

export function useEffect(callback: () => void | (() => void), deps?: any[]): void {
  const inst = getOrCreateInstance(currentInstanceKey);
  const hookIdx = currentHookIndex++;
  const prevEffect = inst.effects[hookIdx];
  if (!prevEffect || depsChanged(prevEffect.deps, deps)) {
    inst.effects[hookIdx] = {
      callback,
      deps,
      cleanup: prevEffect ? prevEffect.cleanup : undefined,
      needsRun: true
    };
  }
}

function expandVNode(vnode: VNode | null, pathPrefix: string): ExpandedVNode[] {
  if (!vnode) return [];
  if (vnode.type === (Fragment as any)) {
    const out: ExpandedVNode[] = [];
    vnode.children.forEach((child, idx) => {
      const childKey = child.key !== null && child.key !== undefined ? String(child.key) : String(idx);
      out.push(...expandVNode(child, `${pathPrefix}/F:${childKey}`));
    });
    return out;
  }
  if (typeof vnode.type === 'function') {
    const fnAny = vnode.type as any;
    if (!fnAny.__khushieCompId) {
      fnAny.__khushieCompId = `C_${Math.random().toString(36).slice(2, 9)}`;
    }
    const compKey = `${pathPrefix}/${fnAny.__khushieCompId}:${vnode.key ?? 0}`;
    activeInstancePaths.add(compKey);
    const prevKey = currentInstanceKey;
    const prevIdx = currentHookIndex;
    currentInstanceKey = compKey;
    currentHookIndex = 0;
    const rendered = vnode.type(vnode.props || {});
    currentInstanceKey = prevKey;
    currentHookIndex = prevIdx;
    if (!rendered) return [];
    if (Array.isArray(rendered)) {
      const flat = flattenChildren(rendered);
      const res: ExpandedVNode[] = [];
      flat.forEach((c, idx) => {
        res.push(...expandVNode(c, `${compKey}/${idx}`));
      });
      return res;
    }
    return expandVNode(rendered, compKey);
  }
  const expandedChildren: ExpandedVNode[] = [];
  vnode.children.forEach((child, idx) => {
    const childKey = child.key !== null && child.key !== undefined ? String(child.key) : String(idx);
    expandedChildren.push(...expandVNode(child, `${pathPrefix}/${ vnode.type }:${childKey}`));
  });
  return [
    {
      type: String(vnode.type),
      props: vnode.props || {},
      children: expandedChildren,
      key: vnode.key
    }
  ];
}

const SVG_TAGS = new Set([
  'svg', 'path', 'circle', 'rect', 'line', 'polyline', 'polygon',
  'g', 'defs', 'linearGradient', 'radialGradient', 'stop', 'ellipse', 'text', 'tspan', 'filter', 'feGaussianBlur'
]);

function applyProps(dom: Element, oldProps: Record<string, any>, newProps: Record<string, any>, vnode: ExpandedVNode, isSvg: boolean) {
  vnode.listeners = vnode.listeners || {};

  // Remove old props/listeners
  for (const k of Object.keys(oldProps)) {
    if (k === 'children' || k === 'key' || k === 'ref') continue;
    if (!(k in newProps)) {
      if (k.startsWith('on') && k.length > 2) {
        const evt = k.slice(2).toLowerCase();
        if (vnode.listeners[evt]) {
          dom.removeEventListener(evt, vnode.listeners[evt]);
          delete vnode.listeners[evt];
        }
      } else if (k === 'className') {
        dom.removeAttribute('class');
      } else if (k === 'style') {
        (dom as HTMLElement).removeAttribute('style');
      } else {
        dom.removeAttribute(k);
      }
    }
  }

  // Set new props/listeners
  for (const [k, val] of Object.entries(newProps)) {
    if (k === 'children' || k === 'key') continue;
    if (k === 'ref') {
      if (val && typeof val === 'object') {
        val.current = dom;
      } else if (typeof val === 'function') {
        val(dom);
      }
      continue;
    }
    if (k.startsWith('on') && k.length > 2 && typeof val === 'function') {
      const evt = k.slice(2).toLowerCase();
      const mappedEvt = evt === 'change' && (dom.tagName === 'INPUT' || dom.tagName === 'TEXTAREA') ? 'input' : evt;
      if (vnode.listeners[mappedEvt]) {
        dom.removeEventListener(mappedEvt, vnode.listeners[mappedEvt]);
      }
      vnode.listeners[mappedEvt] = val as EventListener;
      dom.addEventListener(mappedEvt, val as EventListener);
      continue;
    }
    if (k === 'className') {
      if (val) dom.setAttribute('class', String(val));
      else dom.removeAttribute('class');
      continue;
    }
    if (k === 'htmlFor') {
      if (val) dom.setAttribute('for', String(val));
      continue;
    }
    if (k === 'style' && val && typeof val === 'object') {
      const styleObj = (dom as HTMLElement).style;
      styleObj.cssText = '';
      for (const [sk, sv] of Object.entries(val)) {
        if (sv !== undefined && sv !== null) {
          if (sk.startsWith('--')) {
            styleObj.setProperty(sk, String(sv));
          } else {
            (styleObj as any)[sk] = sv;
          }
        }
      }
      continue;
    }
    if (k === 'dangerouslySetInnerHTML' && val && typeof val.__html === 'string') {
      (dom as HTMLElement).innerHTML = val.__html;
      continue;
    }
    if (k === 'value' && (dom.tagName === 'INPUT' || dom.tagName === 'TEXTAREA' || dom.tagName === 'SELECT')) {
      const inputEl = dom as HTMLInputElement;
      const strVal = val === undefined || val === null ? '' : String(val);
      if (inputEl.value !== strVal) {
        inputEl.value = strVal;
      }
      continue;
    }
    if (k === 'checked' && dom.tagName === 'INPUT') {
      (dom as HTMLInputElement).checked = Boolean(val);
      continue;
    }
    if (typeof val === 'boolean') {
      if (k.startsWith('aria-') || k.startsWith('data-') || k === 'draggable' || k === 'spellCheck') {
        dom.setAttribute(k, String(val));
      } else if (val) {
        dom.setAttribute(k, '');
      } else {
        dom.removeAttribute(k);
      }
      continue;
    }
    if (val !== undefined && val !== null) {
      if (isSvg && k === 'xlinkHref') {
        dom.setAttributeNS('http://www.w3.org/1999/xlink', 'href', String(val));
      } else {
        dom.setAttribute(k, String(val));
      }
    } else {
      dom.removeAttribute(k);
    }
  }
}

function createDomNode(vnode: ExpandedVNode, inSvg: boolean): Node {
  if (vnode.type === '#text') {
    const textNode = document.createTextNode(vnode.props.nodeValue || '');
    vnode.dom = textNode;
    return textNode;
  }
  const isSvg = inSvg || SVG_TAGS.has(vnode.type);
  const el = isSvg
    ? document.createElementNS('http://www.w3.org/2000/svg', vnode.type)
    : document.createElement(vnode.type);
  vnode.dom = el;
  applyProps(el, {}, vnode.props, vnode, isSvg);
  for (const child of vnode.children) {
    el.appendChild(createDomNode(child, isSvg));
  }
  return el;
}

function reconcileNode(
  parentDom: Node,
  oldVNode: ExpandedVNode | null,
  newVNode: ExpandedVNode | null,
  inSvg = false
) {
  if (!oldVNode && newVNode) {
    parentDom.appendChild(createDomNode(newVNode, inSvg));
    return;
  }
  if (oldVNode && !newVNode) {
    if (oldVNode.dom && oldVNode.dom.parentNode === parentDom) {
      parentDom.removeChild(oldVNode.dom);
    }
    return;
  }
  if (!oldVNode || !newVNode) return;

  if (oldVNode.type !== newVNode.type || oldVNode.key !== newVNode.key) {
    const newDom = createDomNode(newVNode, inSvg);
    if (oldVNode.dom && oldVNode.dom.parentNode === parentDom) {
      parentDom.replaceChild(newDom, oldVNode.dom);
    } else {
      parentDom.appendChild(newDom);
    }
    return;
  }

  if (newVNode.type === '#text') {
    const dom = oldVNode.dom as Text;
    newVNode.dom = dom;
    if (dom && dom.nodeValue !== newVNode.props.nodeValue) {
      dom.nodeValue = newVNode.props.nodeValue;
    }
    return;
  }

  const dom = oldVNode.dom as Element;
  newVNode.dom = dom;
  newVNode.listeners = oldVNode.listeners;
  const isSvg = inSvg || SVG_TAGS.has(newVNode.type);
  applyProps(dom, oldVNode.props, newVNode.props, newVNode, isSvg);

  if (newVNode.props.dangerouslySetInnerHTML) return;

  const maxLen = Math.max(oldVNode.children.length, newVNode.children.length);
  for (let i = 0; i < maxLen; i++) {
    reconcileNode(dom, oldVNode.children[i] || null, newVNode.children[i] || null, isSvg);
  }
}

function flushEffectsAndPrune() {
  // Prune unmounted component instances and run their cleanups
  for (const [key, inst] of Array.from(componentInstances.entries())) {
    if (!activeInstancePaths.has(key)) {
      for (const eff of inst.effects) {
        if (eff && typeof eff.cleanup === 'function') {
          try {
            eff.cleanup();
          } catch (e) {
            console.error(e);
          }
        }
      }
      componentInstances.delete(key);
    }
  }

  // Run pending effects on active instances
  for (const key of Array.from(activeInstancePaths)) {
    const inst = componentInstances.get(key);
    if (!inst) continue;
    for (const eff of inst.effects) {
      if (eff && eff.needsRun) {
        eff.needsRun = false;
        if (typeof eff.cleanup === 'function') {
          try {
            eff.cleanup();
          } catch (e) {
            console.error(e);
          }
        }
        try {
          eff.cleanup = eff.callback();
        } catch (e) {
          console.error(e);
        }
      }
    }
  }
}

export function performRender() {
  if (!currentHostRoot || !currentRootVNode) return;
  activeInstancePaths = new Set<string>();
  const vnode = currentRootVNode();
  const expandedList = expandVNode(vnode, 'root');
  const nextTree: ExpandedVNode = {
    type: 'div',
    props: { className: 'khushie-v3-app-shell' },
    children: expandedList
  };

  if (!currentRenderedTree) {
    currentHostRoot.innerHTML = '';
    const dom = createDomNode(nextTree, false);
    currentHostRoot.appendChild(dom);
  } else {
    reconcileNode(currentHostRoot, currentRenderedTree, nextTree, false);
  }
  currentRenderedTree = nextTree;
  flushEffectsAndPrune();
}

export function scheduleRerender() {
  if (isRenderScheduled) return;
  isRenderScheduled = true;
  Promise.resolve().then(() => {
    isRenderScheduled = false;
    performRender();
  });
}

export function renderApp(rootComponent: () => VNode, container: HTMLElement) {
  currentHostRoot = container;
  currentRootVNode = rootComponent;
  performRender();
}

const React = {
  createElement,
  Fragment,
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback
};

export default React;
