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
          bottom: '8px',
          left: '50%',
          transform: 'translateX(-50%)',
          height: '48px',
          background: 'rgba(16, 18, 30, 0.82)',
          backdropFilter: 'blur(24px)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 10px',
          color: 'white',
          boxShadow:
            '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)',
          zIndex: 1000,
          gap: '4px',
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
            fontSize: '18px',
            padding: '6px 10px',
            borderRadius: '8px',
            border: 'none',
            background:
              launcherOpen
                ? 'rgba(61, 174, 233, 0.25)'
                : hoveredBtn === 'launcher'
                ? 'rgba(255,255,255,0.08)'
                : 'transparent',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
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
        <div style={{ display: 'flex', gap: '2px', flex: 1 }}>
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
                  borderRadius: '6px',
                  border: 'none',
                  background:
                    hoveredBtn === appId
                      ? 'rgba(255,255,255,0.1)'
                      : 'rgba(255,255,255,0.04)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  position: 'relative',
                  color: '#d0d3e0',
                  fontFamily: 'inherit',
                }}
              >
                <span>{app.icon}</span>
                <span style={{ fontSize: '12px', fontWeight: 500 }}>{app.name}</span>
                {/* Running indicator */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '2px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '16px',
                    height: '2px',
                    borderRadius: '1px',
                    background: '#3daee9',
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