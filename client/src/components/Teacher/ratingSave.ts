import { useFoodTimeStore } from "@components/Store/foodTime";
import { useRatingStore } from "@components/Store/rating";

export default function useSaveTeacherRating() {
    const { star, opinions } = useRatingStore();
    const { mode: foodTime } = useFoodTimeStore();
    
    return async function() {
        
    }
}