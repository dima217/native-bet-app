import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type CooldownState = {
  cooldown: number;
  setCooldown: (value: number) => void;
  tick: () => void;
  resetCooldown: () => void;
};

export const useCooldownStore = create<CooldownState>()(
  persist(
    (set) => ({
      cooldown: 0,
      setCooldown: (value) => set({ cooldown: value }),
      tick: () =>
        set((state) => ({
          cooldown: Math.max(0, state.cooldown - 1),
        })),
      resetCooldown: () => set({ cooldown: 0 }),
    }),
    {
      name: 'cooldown-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
