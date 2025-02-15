import { useCallback } from 'react';
import { Howl } from 'howler';

const sounds = {
  hover: new Howl({
    src: ['https://assets.codepen.io/154875/hover.mp3'],
    volume: 0.2
  }),
  select: new Howl({
    src: ['https://assets.codepen.io/154875/select.mp3'],
    volume: 0.3
  }),
  transition: new Howl({
    src: ['https://assets.codepen.io/154875/transition.mp3'],
    volume: 0.4
  })
};

export const useSound = () => {
  const playSound = useCallback((type: keyof typeof sounds) => {
    sounds[type].play();
  }, []);

  return { playSound };
};