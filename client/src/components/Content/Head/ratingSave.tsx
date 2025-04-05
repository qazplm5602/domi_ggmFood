import { usePopupStore } from "@components/Popup/store";
import { useFoodTimeStore } from "@components/Store/foodTime";
import { useIdentityStore } from "@components/Store/identity";
import { useLoadingStore } from "@components/Store/loading";
import { ErrorResponse, useRatingStore } from "@components/Store/rating";
import { useScreenStore } from "@components/Store/screen";
import axios, { AxiosError } from "axios";

export default function useSaveRating() {
    const { studentId } = useIdentityStore();
    const { id, star, opinions } = useRatingStore();
    const { setActive: setLoadingActive } = useLoadingStore();
    const { mode: foodTime } = useFoodTimeStore();

    const { setScreen } = useScreenStore();
    const { openPopup } = usePopupStore();

    const addErrorAlert = function(err: AxiosError<ErrorResponse>) {
        if (err.status !== 400) return; // 진짜 먼 오류냐

        const data = err.response?.data;
        if (!data || data.code !== "RATING0") return;

        // 이미 평가 해버림 (아니 근데 진짜~~~ 왜 동시에 함)
        const content = <>
            <p>이미 다른 클라이언트에서 평가 하였습니다.</p>
            <p>수정하려면 다시 해주세요.</p>
        </>;
        const goHome = function() {
            setLoadingActive(false);
            setScreen('Home');
        }

        openPopup("엥", content, [{ text: "확인", callback: goHome }]);
    }
    
    return async function() {
        const data = {
            student: studentId,
            mode: foodTime,
            star,
            opinions
        };
        
        if (id) { // 수정
            await axios.put("./api/rating", data, { params: { id } });
        } else { // 추가 ㅁㄴㅇㄹ
            const success =  await axios.post("./api/rating", data)
                .then(() => true)
                .catch(e => {
                    if (e instanceof AxiosError)
                        addErrorAlert(e);
                    
                    return false;
                });

            // 오류나면 밑으로 안감
            // if (!success) return;
            if (!success)
                throw new Error("api rating post error");
        }
    }
}