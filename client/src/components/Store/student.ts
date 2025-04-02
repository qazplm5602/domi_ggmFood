import { create } from "zustand";

export interface Student {
    id: number,
    grade: number,
    class: number,
    name: string,
}

interface StudnetStoreType {
    // grades: number[],
    classes: { [key: number]: number[] },
    students: { [key: number]: { [key: number]: Student[] } }
}

export const useStudentStore = create<StudnetStoreType>()(set => ({
    // grades: [1,2,3],
    classes: {
        [1]: [1,2,3,4],
        [2]: [1,2,3,4],
        [3]: [1,2,3,4]
    },
    students: {}
}));