import { create } from "zustand";

export type IdentityStep = 'Grade' | 'Class' | 'Name' | 'Star';

interface IdentityStoreType {
    step: IdentityStep,
    grade: number,
    class: number,
    studentId: number,
    setStep: (step: IdentityStep) => void,
    setGrade: (grade: number) => void,
    setClass: (value: number) => void,
    setStudentId: (id: number) => void
}

export const useIdentityStore = create<IdentityStoreType>()(set => ({
    step: 'Grade',
    class: 0,
    grade: 0,
    studentId: -1,
    setStep: (step) => set({ step }),
    setGrade: (grade: number) => set({ grade }),
    setClass: (value) => set({ class: value }),
    setStudentId: (studentId) => set({ studentId })
}));