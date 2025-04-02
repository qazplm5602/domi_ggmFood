import { create } from "zustand";

export type IdentityStep = 'Grade' | 'Class' | 'Name' | 'Star';

interface IdentityStoreType {
    step: IdentityStep,
    grade: number,
    class: number,
    studentId: number,
    setStep: (step: IdentityStep) => void,
    setGrade: (grade: number) => void
}

export const useIdentityStore = create<IdentityStoreType>()(set => ({
    step: 'Star',
    class: 0,
    grade: 0,
    studentId: -1,
    setStep: (step) => set({ step }),
    setGrade: (grade: number) => set({ grade })
}));