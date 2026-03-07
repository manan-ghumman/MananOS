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
      return {
        ...prev,
        [appId]: {
          id: appId,
          name: config.name,
          icon: config.icon,
          x: config.defaultX + Math.random() * 40 - 20,
          y: config.defaultY + Math.random() * 40 - 20,
          width: config.defaultWidth,
          height: config.defaultHeight,
          zIndex: newZ,
          minimized: false,
          maximized: false,
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
