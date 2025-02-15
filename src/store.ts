import { create } from 'zustand';
import { AnatomySystem, BodyPart } from './types';
import { systems } from './data/systems';

interface StoreState {
  activeSystem: AnatomySystem;
  selectedPart: BodyPart | null;
  isExploding: boolean;
  systemOpacity: number;
  setActiveSystem: (system: AnatomySystem) => void;
  setSelectedPart: (part: BodyPart | null) => void;
  setIsExploding: (isExploding: boolean) => void;
  setSystemOpacity: (opacity: number) => void;
  getSystemInfo: (system: AnatomySystem) => typeof systems[0];
}

export const useStore = create<StoreState>((set, get) => ({
  activeSystem: 'nervous',
  selectedPart: null,
  isExploding: false,
  systemOpacity: 1,
  setActiveSystem: (system) => set({ activeSystem: system }),
  setSelectedPart: (part) => set({ selectedPart: part }),
  setIsExploding: (isExploding) => set({ isExploding }),
  setSystemOpacity: (opacity) => set({ systemOpacity: opacity }),
  getSystemInfo: (system) => systems.find(s => s.id === system) || systems[0],
}));