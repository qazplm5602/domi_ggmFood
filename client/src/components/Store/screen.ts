import { create } from "zustand";

export type ScreenNameType = 'Home' | 'Content' | 'Finish';

interface ScreenStoreType {
    screen: ScreenNameType,
    setScreen: (mode: ScreenNameType) => void
}

export const useScreenStore = create<ScreenStoreType>()(set => ({
    screen: "Finish",
    setScreen(mode) {
        set({ screen: mode });
    }
}));