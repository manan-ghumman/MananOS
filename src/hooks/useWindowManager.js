import { useState, useCallback, useRef } from 'react';
import APP_REGISTRY from '../config/apps.jsx';
import { playSound } from '../utils/sound';

export default function useWindowManager() {
  const [windows, setWindows] = useState({});
  const nextZIndex = useRef(10);

    const openApp = useCallback((appId) => {
    playSound('open.mp3');
    setWindows((prev) => {
      if (prev[appId]) {
        const newZ = nextZIndex.current++;
        return {
          ...prev,
          [appId]: { ...prev[appId], zIndex: newZ, minimized: false },
        };
      }

      const config = APP_REGISTRY[appId];
      if (!config) return prev;

      const newZ = nextZIndex.current++;
      
      const isMobile = window.innerWidth < 768;
      const initialWidth = isMobile ? window.innerWidth : Math.min(config.defaultWidth, window.innerWidth - 40);
      const initialHeight = isMobile ? window.innerHeight - 65 : Math.min(config.defaultHeight, window.innerHeight - 100);
      
      const baseX = isMobile ? 0 : config.defaultX;
      const baseY = isMobile ? 0 : config.defaultY;

      return {
        ...prev,
        [appId]: {
          id: appId,
          name: config.name,
          icon: config.icon,
          x: isMobile ? 0 : Math.max(0, Math.min(baseX + Math.random() * 40 - 20, window.innerWidth - initialWidth)),
          y: isMobile ? 0 : Math.max(0, Math.min(baseY + Math.random() * 40 - 20, window.innerHeight - initialHeight)),
          width: initialWidth,
          height: initialHeight,
          zIndex: newZ,
          minimized: false,
          maximized: isMobile,
        },
      };
    });
  }, []);

  const closeApp = useCallback((appId) => {
    playSound('close.mp3');
    setWindows((prev) => {
      const next = { ...prev };
      delete next[appId];
      return next;
    });
  }, []);

  const focusApp = useCallback((appId) => {
    setWindows((prev) => {
      if (!prev[appId]) return prev;
      const newZ = nextZIndex.current++;
      return {
        ...prev,
        [appId]: { ...prev[appId], zIndex: newZ, minimized: false },
      };
    });
  }, []);

  const minimizeApp = useCallback((appId) => {
    setWindows((prev) => {
      if (!prev[appId]) return prev;
      return {
        ...prev,
        [appId]: { ...prev[appId], minimized: true },
      };
    });
  }, []);

  const toggleMaximize = useCallback((appId) => {
    setWindows((prev) => {
      if (!prev[appId]) return prev;
      return {
        ...prev,
        [appId]: { ...prev[appId], maximized: !prev[appId].maximized },
      };
    });
  }, []);

  const updatePosition = useCallback((appId, x, y) => {
    setWindows((prev) => {
      if (!prev[appId]) return prev;
      return {
        ...prev,
        [appId]: { ...prev[appId], x, y },
      };
    });
  }, []);

  const openWindows = Object.values(windows);
  const runningAppIds = Object.keys(windows);

  return {
    windows,
    openWindows,
    runningAppIds,
    openApp,
    closeApp,
    focusApp,
    minimizeApp,
    toggleMaximize,
    updatePosition,
  };
}
