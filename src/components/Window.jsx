import { useRef, useState, useCallback, useEffect } from 'react';

export default function Window({
  id,
  title,
  icon,
  children,
  x,
  y,
  width,
  height,
  zIndex,
  minimized,
  maximized,
  onClose,
  onFocus,
  onMinimize,
  onToggleMaximize,
  onPositionChange,
}) {
  const headerRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const handleMouseDown = useCallback(
    (e) => {
      if (maximized) return;
      e.preventDefault();
      onFocus?.();
      setDragging(true);
      dragOffset.current = {
        x: e.clientX - x,
        y: e.clientY - y,
      };
    },
    [x, y, onFocus, maximized]
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (!dragging) return;
      const newX = e.clientX - dragOffset.current.x;
      const newY = e.clientY - dragOffset.current.y;
      onPositionChange?.(id, newX, newY);
    },
    [dragging, id, onPositionChange]
  );

  const handleMouseUp = useCallback(() => {
    setDragging(false);
  }, []);

  useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, handleMouseMove, handleMouseUp]);

  if (minimized) return null;

  const windowStyle = maximized
    ? {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: 'calc(100vh - 65px)',
        zIndex,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 0,
        overflow: 'hidden',
      }
    : {
        position: 'absolute',
        top: y,
        left: x,
        width,
        height,
        zIndex,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 12px 48px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.06)',
      };

  return (
    <div
      className="window"
      style={windowStyle}
      onMouseDown={() => onFocus?.()}
    >
      {/* Title Bar */}
      <div
        ref={headerRef}
        className="window-titlebar"
        onMouseDown={handleMouseDown}
        onDoubleClick={() => onToggleMaximize?.()}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 12px',
          height: '38px',
          minHeight: '38px',
          background: 'linear-gradient(180deg, #353b50 0%, #282d42 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          cursor: maximized ? 'default' : 'grab',
          userSelect: 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '14px' }}>{icon}</span>
          <span
            style={{
              fontSize: '13px',
              fontWeight: 500,
              color: '#c8cad8',
              letterSpacing: '0.3px',
            }}
          >
            {title}
          </span>
        </div>

        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            className="window-btn window-btn-minimize"
            onClick={(e) => {
              e.stopPropagation();
              onMinimize?.();
            }}
            title="Minimize"
          >
            <svg width="10" height="10" viewBox="0 0 10 10">
              <rect y="8" width="10" height="1.5" rx="0.5" fill="currentColor" />
            </svg>
          </button>
          <button
            className="window-btn window-btn-maximize"
            onClick={(e) => {
              e.stopPropagation();
              onToggleMaximize?.();
            }}
            title="Maximize"
          >
            <svg width="10" height="10" viewBox="0 0 10 10">
              <rect
                x="0.5"
                y="0.5"
                width="9"
                height="9"
                rx="1"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </svg>
          </button>
          <button
            className="window-btn window-btn-close"
            onClick={(e) => {
              e.stopPropagation();
              onClose?.();
            }}
            title="Close"
          >
            <svg width="10" height="10" viewBox="0 0 10 10">
              <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div
        className="window-content"
        style={{
          flex: 1,
          background: '#1a1e2e',
          overflow: 'auto',
          padding: '20px',
        }}
      >
        {children}
      </div>
    </div>
  );
}
