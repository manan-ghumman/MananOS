import { useState, useEffect, useRef } from 'react';
import { playSound } from '../utils/sound';

const BOOT_LINES = [
  '[    0.000000] MananOS kernel v1.0 initializing...',
  '[    0.012045] CPU: React 19 Virtual Processor',
  '[    0.024890] Memory: 16384MB available',
  '[    0.037234] Loading kernel modules...',
  '[    0.156789] [  OK  ] Loaded module: vite-hmr',
  '[    0.234567] [  OK  ] Loaded module: react-dom',
  '[    0.312345] [  OK  ] Loaded module: state-manager',
  '[    0.401234] [  OK  ] Loaded module: window-compositor',
  '[    0.489012] Initializing display server...',
  '[    0.567890] [  OK  ] Display server started: MananOS Wayland Compositor',
  '[    0.645678] [  OK  ] Started Desktop Environment: Plasma 6.0 (simulated)',
  '[    0.723456] [  OK  ] Panel service loaded',
  '[    0.801234] [  OK  ] Widget engine initialized',
  '[    0.879012] [  OK  ] Application launcher ready',
  '[    0.956789] Starting MananOS Desktop...',
  '',
  '  Welcome to MananOS.',
  '',
];

export default function BootScreen({ onFinished }) {
  const [lines, setLines] = useState([]);
  const [phase, setPhase] = useState('boot');
  const callbackRef = useRef(onFinished);
  callbackRef.current = onFinished;
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    let idx = 0;
    const timers = [];

    function addNextLine() {
      if (idx < BOOT_LINES.length) {
        const currentIdx = idx;
        setLines((prev) => [...prev, BOOT_LINES[currentIdx]]);
        idx++;
        timers.push(setTimeout(addNextLine, 80));
      } else {
        timers.push(setTimeout(() => {
          setPhase('logo');
          playSound('startup.mp3');
        }, 300));
        timers.push(setTimeout(() => setPhase('done'), 2000));
        timers.push(setTimeout(() => callbackRef.current?.(), 2500));
      }
    }

    timers.push(setTimeout(addNextLine, 80));

    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  if (phase === 'done') {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: '#0d1117',
          zIndex: 9999,
          animation: 'fadeOut 0.5s ease forwards',
        }}
      />
    );
  }

  if (phase === 'logo') {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: '#0d1117',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'fadeIn 0.4s ease',
        }}
      >
        <div
          style={{
            fontSize: '48px',
            marginBottom: '16px',
            animation: 'pulse 1.5s ease infinite',
          }}
        >
          🖥️
        </div>
        <div
          style={{
            fontSize: '28px',
            fontWeight: 700,
            color: '#e0e2ec',
            letterSpacing: '2px',
          }}
        >
          MananOS
        </div>
        <div
          style={{
            fontSize: '12px',
            color: '#6b7080',
            marginTop: '8px',
          }}
        >
          Loading desktop environment...
        </div>
        <div
          style={{
            marginTop: '24px',
            width: '200px',
            height: '3px',
            background: 'rgba(255,255,255,0.08)',
            borderRadius: '2px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, #3daee9, #27ae60)',
              borderRadius: '2px',
              animation: 'loadBar 1.5s ease-in-out',
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#0d1117',
        zIndex: 9999,
        padding: '30px',
        fontFamily: '"JetBrains Mono", "Fira Code", "Consolas", monospace',
        fontSize: '12px',
        color: '#a8e6cf',
        overflowY: 'auto',
        lineHeight: 1.7,
      }}
    >
      {lines.map((line, i) => (
        <div key={i} style={{ whiteSpace: 'pre-wrap', minHeight: '18px' }}>
          {line.includes('[  OK  ]') ? (
            <>
              <span style={{ color: '#27ae60' }}>[  OK  ]</span>
              {line.replace('[  OK  ]', '')}
            </>
          ) : (
            line
          )}
        </div>
      ))}
      <span
        style={{
          animation: 'blink 0.8s step-end infinite',
          color: '#3daee9',
        }}
      >
        █
      </span>
    </div>
  );
}
