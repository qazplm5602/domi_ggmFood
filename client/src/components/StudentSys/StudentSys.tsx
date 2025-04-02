import { useEffect } from "react";
import axios from 'axios';
import { Student } from "@components/Store/student";

export default function StudentSys() {
    const loadStudent = async function(aliveRef: { alive: boolean }) {
        const response = await axios.get<Student[]>("/api/students");
        if (!aliveRef.alive) return;

        // ....
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