import { useEffect, useState } from "react";
import axios from 'axios';
import { Student } from "@components/Store/student";
import StudentSysLoading from "./Loading";

export default function StudentSys() {
    const [ loading, setLoading ] = useState(true);

    const loadStudent = async function(aliveRef: { alive: boolean }) {
        setLoading(true);

        const response = await axios.get<Student[]>("/api/students");
        if (!aliveRef.alive) return;

        // ....
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