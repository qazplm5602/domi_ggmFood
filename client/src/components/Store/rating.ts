import { create } from "zustand";

interface RatingStoreType {
    star: number,
    setStar: (amount: number) => void
}

export const useRatingStore = create<RatingStoreType>()(set => ({
    star: 1,
    setStar(amount) {
        set({ star: amount });
    }
}));