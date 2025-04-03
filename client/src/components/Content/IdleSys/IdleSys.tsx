import { usePopupStore } from "@components/Popup/store";
import { useIdentityStore } from "@components/Store/identity";
import { useScreenStore } from "@components/Store/screen";
import { useEffect } from "react";

const IDLE_DURATION = 60; // 60초 동안 페이지가 바뀌지 않으면 경고 띄움ㅁㅁㅁㅁ
const WARNING_DURATION = 10;

export default function ContentIdleSys() {
    const { step } = useIdentityStore();
    const { openPopup, closePopup } = usePopupStore();
    const { setScreen } = useScreenStore();
    
    useEffect(() => {
        let handler: NodeJS.Timeout | null = null;
        let alive = true;

        const goHome = function() {
            setScreen('Home');
        }

        const registerIdleTimer = function() {
            if (!alive) return;

            if (handler)
                clearTimeout(handler);

            handler = setTimeout(() => {

                handler = setTimeout(() => {
                 if (!alive) return;
                    // 이래도 안해????
                    closePopup();
                    goHome();
                }, WARNING_DURATION * 1000);
                
                // 시간이 지남
                const content = <>
                    <p>오랫동안 입력이 되지 않았습니다.</p>
                    <p>잠시 후 홈으로 돌아갑니다.</p>
                </>;

                openPopup("아무도 없나요???", content, [
                    { text: "더 있을래요.", color: "#3283D5", callback: registerIdleTimer },
                    { text: "홈으로", callback: goHome }
                ]);
                
            }, IDLE_DURATION * 1000);
        }
        registerIdleTimer();

        return () => {
            if (handler)
                clearTimeout(handler);

            alive = false;
        }
    }, [ step ]);

    return null;
}