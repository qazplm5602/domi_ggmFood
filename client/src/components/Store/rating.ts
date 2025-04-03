import { create } from "zustand";
import { FoodTimeMode } from "./foodTime";

export interface RatingDetail {
    star: number,
    opinions: string[],
    mode: FoodTimeMode
}

interface RatingStoreType {
    star: number,
    opinions: string[],
    foodTime?: FoodTimeMode,
    id?: number,
    setStar: (amount: number) => void,
    addOpinion: (text: string) => void,
    removeOpinion: (idx: number) => void,
    dataLoad: (id: number, data: RatingDetail) => void,
    reset: () => void
}

export const useRatingStore = create<RatingStoreType>()(set => ({
    star: 1,
    opinions: [],
    setStar(amount) {
        set({ star: amount });
    },
    addOpinion(value) {
        set(prev => ({ opinions: [...prev.opinions, value] }));
    },
    removeOpinion(idx) {
        set(prev => {
            const newVal = [ ...prev.opinions ];
            newVal.splice(idx, 1);
            
            return { opinions: newVal };
        });
    },
    reset: () => set({ id: undefined, foodTime: undefined, star: 1, opinions: [] }),
    dataLoad(id, data) {
        set({ id, star: data.star, opinions: data.opinions, foodTime: data.mode });
    }
}));