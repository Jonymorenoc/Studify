import { Howl } from 'howler';

// Rutas a los archivos de audio
const AUDIO_FILES = {
  correct: '/Studify/sounds/correct.mp3',
  wrong: '/Studify/sounds/wrong.mp3',
  sticker: '/Studify/sounds/sticker.mp3',
  click: '/Studify/sounds/click.mp3'
};

// Cache de sonidos precargados
const soundCache: Record<string, Howl> = {};

// Crear instancia de Howl para un sonido
function createSound(src: string): Howl {
  return new Howl({
    src: [src],
    volume: 0.5,
    preload: true,
    html5: true // Mejor para PWA y mobile
  });
}

// Precargar todos los sonidos
export function preloadSounds() {
  Object.entries(AUDIO_FILES).forEach(([key, src]) => {
    if (!soundCache[key]) {
      soundCache[key] = createSound(src);
    }
  });
}

// Reproducir un sonido
export function playSound(soundName: 'correct' | 'wrong' | 'sticker' | 'click', enabled: boolean = true) {
  if (!enabled) return;

  try {
    const sound = soundCache[soundName];
    if (sound) {
      sound.play();
    } else {
      // Si no está en cache, crear y reproducir
      const src = AUDIO_FILES[soundName];
      const newSound = createSound(src);
      soundCache[soundName] = newSound;
      newSound.play();
    }
  } catch (error) {
    console.warn('Error reproduciendo sonido:', error);
  }
}

// Detener todos los sonidos
export function stopAllSounds() {
  Object.values(soundCache).forEach(sound => {
    sound.stop();
  });
}

// Ajustar volumen global
export function setGlobalVolume(volume: number) {
  Object.values(soundCache).forEach(sound => {
    sound.volume(Math.max(0, Math.min(1, volume)));
  });
}
