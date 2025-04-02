import { create } from "zustand";

interface FoodTimeStoreType {
    mode: 0 | 1 | 2,
}

export const useFoodTimeStore = create<FoodTimeStoreType>()(set => ({
    mode: 0,
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