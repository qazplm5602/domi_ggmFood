import { useEffect } from "react";
import axios from 'axios';
import { Student, StudentsTable, useStudentStore } from "@components/Store/student";
import { useLoadingStore } from "@components/Store/loading";

export default function StudentSys() {
    const { setActive: setLoadingActive } = useLoadingStore();
    const { setStudents } = useStudentStore();

    const loadStudent = async function(aliveRef: { alive: boolean }) {
        setLoadingActive(true);

        const response = await axios.get<Student[]>("/api/students");
        if (!aliveRef.alive) return;

        // 학생 데이터 파싱
        const result: StudentsTable = {};

        for (const user of response.data) {
            let grades = result[user.grade];
            
            if (!grades) {
                grades = result[user.grade] = {};
            }
            
            let classes = grades[user.class];

            if (!classes) {
                classes = grades[user.class] = [];
            }

            classes.push(user);
        }
        setStudents(result);
        setLoadingActive(false);
    }

    useEffect(() => {
        const aliveRef = { alive: true };
        loadStudent(aliveRef);

        return () => {
            aliveRef.alive = false;
        }
    }, []);

    return null;
}