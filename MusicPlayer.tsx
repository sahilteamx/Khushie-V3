import React, { useState, useRef, useEffect } from '../lib/react-runtime';
import { SITE_CONTENT } from '../data/content';

function formatSeconds(sec: number): string {
  if (!Number.isFinite(sec) || sec < 0) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.75);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(14);
  const [audioStatus, setAudioStatus] = useState<'ready' | 'loading' | 'fallback-synth' | 'error'>('ready');
  const [expanded, setExpanded] = useState<boolean>(false);
  const [minimizedOrb, setMinimizedOrb] = useState<boolean>(false);
  const [triedFallbackPath, setTriedFallbackPath] = useState<boolean>(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoadedMetadata = () => {
      if (audio.duration && Number.isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
      setAudioStatus('ready');
    };

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime || 0);
    };

    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const onError = () => {
      if (!triedFallbackPath && audio.src.includes('/public/audio/')) {
        setTriedFallbackPath(true);
        audio.src = SITE_CONTENT.audioFallbackPath;
        audio.load();
      } else {
        setAudioStatus('error');
        setIsPlaying(false);
      }
    };

    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
    };
  }, [triedFallbackPath]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    audio.volume = isMuted ? 0 : volume;
    const playPromise = audio.play();
    if (playPromise && typeof playPromise.then === 'function') {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setAudioStatus('ready');
        })
        .catch(() => {
          setAudioStatus('error');
          setIsPlaying(false);
        });
    } else {
      setIsPlaying(true);
    }
  };

  const handleSeek = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const nextTime = parseFloat(target.value);
    const audio = audioRef.current;
    if (audio && Number.isFinite(nextTime)) {
      audio.currentTime = nextTime;
      setCurrentTime(nextTime);
    }
  };

  const handleVolumeChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const nextVol = parseFloat(target.value);
    setVolume(nextVol);
    if (nextVol > 0 && isMuted) {
      setIsMuted(false);
    }
    if (audioRef.current) {
      audioRef.current.volume = nextVol;
      audioRef.current.muted = false;
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (audioRef.current) {
      audioRef.current.muted = nextMuted;
    }
  };

  return (
    <aside
      className={`music-player-dock ${expanded ? 'expanded' : 'compact'} ${minimizedOrb ? 'orb-only' : ''}`}
      aria-label="Birthday Music Player (User Controlled)"
    >
      <audio
        ref={audioRef}
        src={SITE_CONTENT.audioTrackPath}
        preload="metadata"
      />

      <div className="music-dock-bar">
        <button
          type="button"
          className={`music-play-btn ${isPlaying ? 'playing' : ''}`}
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause birthday melody' : 'Play birthday melody'}
        >
          <span aria-hidden="true">{isPlaying ? '❚❚' : '▶'}</span>
        </button>

        <div className="music-meta">
          <div className="music-title-row">
            <span className={`music-eq ${isPlaying ? 'active' : ''}`} aria-hidden="true">
              <i /><i /><i />
            </span>
            <span className="music-track-name">{SITE_CONTENT.audioTrackTitle}</span>
          </div>
          <span className="music-time-label" aria-live="off">
            {audioStatus === 'error'
              ? 'Audio file unavailable'
              : `${formatSeconds(currentTime)} / ${formatSeconds(duration)}`}
          </span>
        </div>

        <button
          type="button"
          className="music-expand-btn"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-label={expanded ? 'Hide audio controls' : 'Show volume and seek controls'}
        >
          {expanded ? '▾' : '▴'}
        </button>
        <button
          type="button"
          className="music-minimize-btn"
          onClick={() => {
            setExpanded(false);
            setMinimizedOrb(!minimizedOrb);
          }}
          aria-label={minimizedOrb ? 'Restore music player bar' : 'Minimize music player to compact icon'}
          title={minimizedOrb ? 'Expand player' : 'Minimize player'}
        >
          {minimizedOrb ? '♫' : '−'}
        </button>
      </div>

      {expanded ? (
        <div className="music-controls-drawer">
          <div className="music-control-group">
            <label htmlFor="music-seek-slider" className="music-control-label">
              Progress
            </label>
            <input
              id="music-seek-slider"
              type="range"
              min="0"
              max={Math.max(1, Math.ceil(duration))}
              step="0.1"
              value={currentTime}
              onChange={handleSeek}
              aria-label="Seek audio position"
              className="music-slider"
            />
          </div>

          <div className="music-control-group">
            <button
              type="button"
              className="music-mute-btn"
              onClick={toggleMute}
              aria-pressed={isMuted}
              aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
            >
              {isMuted || volume === 0 ? '🔇 Mute' : '🔊 Vol'}
            </button>
            <input
              id="music-vol-slider"
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              aria-label="Audio volume"
              className="music-slider"
            />
          </div>
        </div>
      ) : null}
    </aside>
  );
}
