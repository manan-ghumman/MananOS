import { useState, useEffect } from 'react';
import APP_REGISTRY from '../config/apps.jsx';
import AppLauncher from './AppLauncher';
import { playSound, getSoundEnabled, toggleSoundGlobally } from '../utils/sound';

export default function Panel({ runningAppIds, onOpenApp, onFocusApp }) {
  const [launcherOpen, setLauncherOpen] = useState(false);
  const [time, setTime] = useState(new Date());
  const [hoveredBtn, setHoveredBtn] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(getSoundEnabled());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 15000);
    return () => clearInterval(timer);
  }, []);

  const timeStr = time.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const dateStr = time.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <>
      <div
        className="panel"
        style={{
          position: 'fixed',
          bottom: '12px',
          left: '50%',
          transform: 'translateX(-50%)',
          height: '52px',
          background: 'rgba(12, 14, 25, 0.75)',
          backdropFilter: 'blur(32px)',
          WebkitBackdropFilter: 'blur(32px)',
          borderRadius: '16px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 12px',
          color: 'white',
          boxShadow:
            '0 20px 40px -10px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)',
          zIndex: 1000,
          gap: '6px',
          minWidth: '500px',
          width: 'auto',
          maxWidth: '90vw',
        }}
      >
        {/* Launcher Button */}
        <button
          className="panel-btn launcher-btn"
          onClick={() => {
            playSound('close.mp3');
            setLauncherOpen((o) => !o);
          }}
          onMouseEnter={() => setHoveredBtn('launcher')}
          onMouseLeave={() => setHoveredBtn(null)}
          title="Application Launcher"
          style={{
            fontSize: '20px',
            padding: '6px 12px',
            borderRadius: '10px',
            border: 'none',
            background:
              launcherOpen
                ? 'rgba(61, 174, 233, 0.3)'
                : hoveredBtn === 'launcher'
                ? 'rgba(255,255,255,0.1)'
                : 'transparent',
            cursor: 'pointer',
            transition: 'all 0.2s cubic-bezier(0.25, 1, 0.5, 1)',
            transform: hoveredBtn === 'launcher' ? 'scale(1.05)' : 'scale(1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect x="2" y="2" width="7" height="7" rx="1.5" fill="#3daee9" />
            <rect x="11" y="2" width="7" height="7" rx="1.5" fill="#3daee9" opacity="0.7" />
            <rect x="2" y="11" width="7" height="7" rx="1.5" fill="#3daee9" opacity="0.7" />
            <rect x="11" y="11" width="7" height="7" rx="1.5" fill="#3daee9" opacity="0.4" />
          </svg>
        </button>

        {/* Separator */}
        <div
          style={{
            width: '1px',
            height: '24px',
            background: 'rgba(255,255,255,0.08)',
            margin: '0 4px',
          }}
        />

        {/* Running Apps */}
        <div className="running-apps" style={{ display: 'flex', gap: '2px', flex: 1, overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {runningAppIds.map((appId) => {
            const app = APP_REGISTRY[appId];
            if (!app) return null;
            return (
              <button
                key={appId}
                onClick={() => onFocusApp(appId)}
                onMouseEnter={() => setHoveredBtn(appId)}
                onMouseLeave={() => setHoveredBtn(null)}
                title={app.name}
                style={{
                  fontSize: '16px',
                  padding: '6px 12px',
                  borderRadius: '10px',
                  border: 'none',
                  background:
                    hoveredBtn === appId
                      ? 'rgba(255,255,255,0.1)'
                      : 'rgba(255,255,255,0.02)',
                  cursor: 'pointer',
                  transition: 'all 0.2s cubic-bezier(0.25, 1, 0.5, 1)',
                  transform: hoveredBtn === appId ? 'scale(1.05)' : 'scale(1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  position: 'relative',
                  color: '#e2e8f0',
                  fontFamily: 'inherit',
                }}
              >
                <span style={{ fontSize: '18px' }}>{app.icon}</span>
                <span style={{ fontSize: '13px', fontWeight: 500, letterSpacing: '0.3px' }}>{app.name}</span>
                {/* Running indicator */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-4px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: hoveredBtn === appId ? '24px' : '16px',
                    height: '3px',
                    borderRadius: '2px',
                    background: 'oklch(75% 0.15 200)', // Vibrant Cyan
                    boxShadow: '0 0 8px oklch(75% 0.15 200)',
                    transition: 'all 0.2s ease',
                  }}
                />
              </button>
            );
          })}
        </div>

        {/* Separator */}
        <div
          style={{
            width: '1px',
            height: '24px',
            background: 'rgba(255,255,255,0.08)',
            margin: '0 4px',
          }}
        />

        {/* System Tray */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '4px 8px',
            borderRadius: '6px',
            fontSize: '12px',
            color: '#a0a5b8',
          }}
        >
          <span
            onClick={() => setSoundEnabled(toggleSoundGlobally())}
            title={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
            style={{ fontSize: '13px', cursor: 'pointer' }}
          >
            {soundEnabled ? '🔊' : '🔇'}
          </span>
          <span style={{ fontSize: '13px' }}>🌐</span>
        </div>

        {/* Separator */}
        <div
          style={{
            width: '1px',
            height: '24px',
            background: 'rgba(255,255,255,0.08)',
            margin: '0 4px',
          }}
        />

        {/* Clock */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            padding: '2px 6px',
            lineHeight: 1.2,
          }}
        >
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#d0d3e0' }}>
            {timeStr}
          </span>
          <span style={{ fontSize: '10px', color: '#6b7080' }}>{dateStr}</span>
        </div>
      </div>

      <AppLauncher
        isOpen={launcherOpen}
        onClose={() => setLauncherOpen(false)}
        onOpenApp={onOpenApp}
      />
    </>
  );
}