import { create } from "zustand";

interface LoadingStoreType {
    loading: boolean,
    setActive: (active: boolean) => void
}

export const useLoadingStore = create<LoadingStoreType>()(set => ({
    loading: false,
    setActive: (loading) => set({ loading })
}));