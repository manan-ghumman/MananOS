import { useState, useRef, useEffect } from 'react';
import APP_REGISTRY from '../config/apps.jsx';
import { LAUNCHER_CATEGORIES } from '../config/desktop.jsx';

export default function AppLauncher({ isOpen, onClose, onOpenApp }) {
  const [search, setSearch] = useState('');
  const panelRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    setSearch('');
  }, [isOpen]);

  useEffect(() => {
    function handleClick(e) {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose?.();
      }
    }
    if (isOpen) {
      setTimeout(() => document.addEventListener('mousedown', handleClick), 0);
    }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const allApps = Object.values(APP_REGISTRY);
  const filteredApps = search.trim()
    ? allApps.filter((a) =>
        a.name.toLowerCase().includes(search.trim().toLowerCase())
      )
    : null;

  return (
    <div
      ref={panelRef}
      className="app-launcher"
      style={{
        position: 'fixed',
        bottom: '65px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '380px',
        maxHeight: '480px',
        background: 'rgba(22, 25, 40, 0.95)',
        backdropFilter: 'blur(24px)',
        borderRadius: '14px',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
        zIndex: 2000,
        overflow: 'hidden',
        animation: 'launcherIn 0.2s ease-out',
      }}
    >
      {/* Search Bar */}
      <div style={{ padding: '16px 16px 12px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255,255,255,0.06)',
            borderRadius: '8px',
            padding: '8px 12px',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <span style={{ fontSize: '14px', opacity: 0.5 }}>🔍</span>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search applications..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#e0e2ec',
              fontSize: '13px',
              width: '100%',
              fontFamily: 'inherit',
            }}
          />
        </div>
      </div>

      {/* App List */}
      <div style={{ padding: '0 12px 16px', overflowY: 'auto', maxHeight: '380px' }}>
        {filteredApps ? (
          filteredApps.length > 0 ? (
            filteredApps.map((app) => (
              <AppItem
                key={app.id}
                app={app}
                onClick={() => {
                  onOpenApp(app.id);
                  onClose();
                }}
              />
            ))
          ) : (
            <div
              style={{
                padding: '20px',
                textAlign: 'center',
                color: '#6b7080',
                fontSize: '13px',
              }}
            >
              No applications found
            </div>
          )
        ) : (
          LAUNCHER_CATEGORIES.map((cat) => (
            <div key={cat.label}>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#6b7080',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  padding: '8px 8px 6px',
                }}
              >
                {cat.label}
              </div>
              {cat.apps.map((appId) => {
                const app = APP_REGISTRY[appId];
                if (!app) return null;
                return (
                  <AppItem
                    key={app.id}
                    app={app}
                    onClick={() => {
                      onOpenApp(app.id);
                      onClose();
                    }}
                  />
                );
              })}
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: '10px 16px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span style={{ fontSize: '12px', color: '#5a5f72', fontWeight: 500 }}>
          MananOS v1.0
        </span>
        <span style={{ fontSize: '11px', color: '#4a4f62' }}>
          ⌨️ Type to search
        </span>
      </div>
    </div>
  );
}

function AppItem({ app, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '8px 10px',
        borderRadius: '8px',
        cursor: 'pointer',
        background: hover ? 'rgba(61, 174, 233, 0.12)' : 'transparent',
        transition: 'background 0.15s ease',
      }}
    >
      <span style={{ fontSize: '22px' }}>{app.icon}</span>
      <span style={{ fontSize: '13.5px', fontWeight: 500, color: '#d0d3e0' }}>
        {app.name}
      </span>
    </div>
  );
}
