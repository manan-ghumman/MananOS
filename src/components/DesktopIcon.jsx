import { useState } from 'react';

export default function DesktopIcon({ name, icon, onOpen }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="desktop-icon"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onDoubleClick={() => {
        if (window.innerWidth > 768) onOpen();
      }}
      onTouchEnd={(e) => {
        e.preventDefault(); // Prevents simulated mouse events like onClick from firing twice
        onOpen();
      }}
      onClick={() => {
        if (window.innerWidth <= 768) onOpen();
      }}
      style={{
        width: '90px',
        padding: '10px 6px',
        touchAction: 'manipulation',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        cursor: 'pointer',
        borderRadius: '8px',
        background: hover ? 'rgba(61, 174, 233, 0.15)' : 'transparent',
        border: hover ? '1px solid rgba(61, 174, 233, 0.3)' : '1px solid transparent',
        transition: 'all 0.2s ease',
        userSelect: 'none',
      }}
    >
      <div
        style={{
          fontSize: '36px',
          filter: hover ? 'drop-shadow(0 0 8px rgba(61,174,233,0.5))' : 'none',
          transition: 'filter 0.2s ease, transform 0.2s ease',
          transform: hover ? 'scale(1.1)' : 'scale(1)',
        }}
      >
        {icon}
      </div>
      <span
        style={{
          fontSize: '11.5px',
          fontWeight: 500,
          color: '#e0e2ec',
          textAlign: 'center',
          textShadow: '0 1px 4px rgba(0,0,0,0.6)',
          lineHeight: 1.2,
        }}
      >
        {name}
      </span>
    </div>
  );
}
