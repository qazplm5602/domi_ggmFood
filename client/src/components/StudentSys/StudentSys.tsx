import { useEffect, useState } from "react";
import axios from 'axios';
import { Student, StudentsTable, useStudentStore } from "@components/Store/student";
import StudentSysLoading from "./Loading";

export default function StudentSys() {
    const [ loading, setLoading ] = useState(true);
    const { setStudents } = useStudentStore();

    const loadStudent = async function(aliveRef: { alive: boolean }) {
        setLoading(true);

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

        setLoading(false);
    }

    useEffect(() => {
        const aliveRef = { alive: true };
        loadStudent(aliveRef);

        return () => {
            aliveRef.alive = false;
        }
    }, []);

    if (loading)
        return <StudentSysLoading />;

    return null;
}