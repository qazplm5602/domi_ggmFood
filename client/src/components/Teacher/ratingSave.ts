import { useFoodTimeStore } from "@components/Store/foodTime";
import { useRatingStore } from "@components/Store/rating";
import axios from "axios";

export default function useSaveTeacherRating() {
    const { star, opinions } = useRatingStore();
    const { mode: foodTime } = useFoodTimeStore();
    
    return async function() {
        await axios.post("./api/rating/teacher", { star, opinions, mode: foodTime });
    }
}