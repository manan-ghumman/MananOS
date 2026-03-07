let soundEnabled = true;

export const toggleSoundGlobally = () => {
  soundEnabled = !soundEnabled;
  return soundEnabled;
};

export const getSoundEnabled = () => soundEnabled;

export const playSound = (soundFile) => {
  if (!soundEnabled) return;
  try {
    const audio = new Audio(`/${soundFile}`);
    audio.play().catch((err) => {
      console.warn(`Could not play ${soundFile}:`, err.message);
    });
  } catch (error) {
    console.error('Failed to initialize audio:', error);
  }
};
