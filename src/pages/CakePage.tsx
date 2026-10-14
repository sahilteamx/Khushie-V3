import React from '../lib/react-runtime';
import { RoutePath } from '../types/content';
import { CakeCeremony } from '../components/CakeCeremony';

interface CakePageProps {
  onNavigate: (path: RoutePath) => void;
  reducedMotion: boolean;
}

export function CakePage({ onNavigate, reducedMotion }: CakePageProps) {
  return (
    <div className="page-container cake-page">
      <CakeCeremony
        reducedMotion={reducedMotion}
        onNavigate={(p: string) => onNavigate(p as RoutePath)}
        standalone={true}
      />
    </div>
  );
}
