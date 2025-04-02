import { create } from "zustand";

export interface Student {
    id: number,
    grade: number,
    class: number,
    num: number,
    name: string,
}

export type StudentsTable = { [key: number]: { [key: number]: Student[] } };

interface StudnetStoreType {
    // grades: number[],
    // classes: { [key: number]: number[] },
    students: StudentsTable,
    setStudents: (data: StudentsTable) => void
}

export const useStudentStore = create<StudnetStoreType>()(set => ({
    // grades: [1,2,3],
    // classes: {
    //     [1]: [1,2,3,4],
    //     [2]: [1,2,3,4],
    //     [3]: [1,2,3,4]
    // },
    students: {},
    setStudents: (students) => set({ students })
}));