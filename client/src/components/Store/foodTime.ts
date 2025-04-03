import { create } from "zustand";

type FoodTimeMode = 0 | 1 | 2;

interface FoodTimeStoreType {
    mode: FoodTimeMode,
    setMode: (mode: FoodTimeMode) => void
}

export const useFoodTimeStore = create<FoodTimeStoreType>()(set => ({
    mode: 0,
    setMode: mode => set({ mode })
}));

export function getFoodTimeDisplayName(mode: FoodTimeStoreType['mode']) {
    switch (mode) {
        case 0:
            return '조식';
        case 1:
            return '중식';
        case 2:
            return '석식';
        default:
            break;
    }
}