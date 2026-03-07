import { useState, useCallback } from 'react';
import Panel from './Panel';
import Window from './Window';
import DesktopIcon from './DesktopIcon';
import BootScreen from './BootScreen';
import { ClockWidget, QuoteWidget } from './Widgets';
import { DESKTOP_ICONS } from '../config/desktop.jsx';
import useWindowManager from '../hooks/useWindowManager';

import Projects from './Projects';
import Terminal from './Terminal';
import Resume from './Resume';
import Contact from './Contact';

const APP_CONTENT = {
  projects: <Projects />,
  terminal: <Terminal />,
  resume: <Resume />,
  contact: <Contact />,
};

export default function Desktop() {
  const [booted, setBooted] = useState(false);
  const {
    openWindows,
    runningAppIds,
    openApp,
    closeApp,
    focusApp,
    minimizeApp,
    toggleMaximize,
    updatePosition,
  } = useWindowManager();

  const handleBootFinished = useCallback(() => {
    setBooted(true);
  }, []);

  return (
    <div
      className="desktop"
      style={{
        height: '100vh',
        width: '100vw',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0f0c29 0%, #1b1e42 40%, #24243e 70%, #302b63 100%)',
      }}
    >
      {/* Animated background mesh */}
      <div className="desktop-mesh" />

      {!booted && <BootScreen onFinished={handleBootFinished} />}

      {/* Desktop Icons */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          zIndex: 1,
        }}
      >
        {DESKTOP_ICONS.map((icon) => (
          <DesktopIcon
            key={icon.id}
            name={icon.name}
            icon={icon.icon}
            onOpen={() => openApp(icon.appId)}
          />
        ))}
      </div>

      {/* Widgets */}
      <ClockWidget />
      <QuoteWidget />

      {/* Windows */}
      {openWindows.map((win) => (
        <Window
          key={win.id}
          id={win.id}
          title={win.name}
          icon={win.icon}
          x={win.x}
          y={win.y}
          width={win.width}
          height={win.height}
          zIndex={win.zIndex}
          minimized={win.minimized}
          maximized={win.maximized}
          onClose={() => closeApp(win.id)}
          onFocus={() => focusApp(win.id)}
          onMinimize={() => minimizeApp(win.id)}
          onToggleMaximize={() => toggleMaximize(win.id)}
          onPositionChange={updatePosition}
        >
          {APP_CONTENT[win.id] || (
            <div style={{ color: '#8b90a0' }}>App content not found</div>
          )}
        </Window>
      ))}

      {/* Panel */}
      <Panel
        runningAppIds={runningAppIds}
        onOpenApp={openApp}
        onFocusApp={(appId) => {
          const win = openWindows.find((w) => w.id === appId);
          if (win?.minimized) {
            minimizeApp(appId); // toggle back
          }
          focusApp(appId);
        }}
      />
    </div>
  );
}