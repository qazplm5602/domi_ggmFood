import { create } from "zustand";

export type ScreenNameType = 'Home';

interface ScreenStoreType {
    screen: ScreenNameType,
    setScreen: (mode: ScreenNameType) => void
}

export const useScreenStore = create<ScreenStoreType>()(set => ({
    screen: "Home",
    setScreen(mode) {
        set({ screen: mode });
    }
}));