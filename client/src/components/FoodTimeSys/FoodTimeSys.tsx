import { useFoodTimeStore } from "@components/Store/foodTime";
import { useEffect } from "react";

export default function LunchTimeSys() {
    const { setMode } = useFoodTimeStore();

    const checkFoodTime = function() {
        const now = new Date();
        const hour = now.getHours();
        
        if (hour > 17) {
            setMode(2); // 석식
        } else if (hour > 12) {
            setMode(1); // 중식
        } else {
            setMode(0); // 조식
        }
    }

    useEffect(() => {
        const handle = setInterval(checkFoodTime, 5000);
        checkFoodTime();

        return () => {
            clearInterval(handle);
        }
    }, []);
    
    return null;
}