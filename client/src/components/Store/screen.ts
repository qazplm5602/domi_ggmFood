import { create } from "zustand";

export type ScreenNameType = 'Home' | 'Content';

interface ScreenStoreType {
    screen: ScreenNameType,
    setScreen: (mode: ScreenNameType) => void
}

export const useScreenStore = create<ScreenStoreType>()(set => ({
    screen: "Content",
    setScreen(mode) {
        set({ screen: mode });
    }
}));