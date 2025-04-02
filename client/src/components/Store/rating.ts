import { create } from "zustand";

interface RatingStoreType {
    star: number,
    opinions: string[],
    setStar: (amount: number) => void,
    addOpinion: (text: string) => void,
    removeOpinion: (idx: number) => void,
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
    reset: () => set({ star: 1, opinions: [] })
}));