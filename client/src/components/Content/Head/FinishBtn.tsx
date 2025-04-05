import style from '@styles/content/style.module.scss';
import checkIcon from '@assets/icons/check.svg';
import { motion } from 'framer-motion';
import { useLoadingStore } from '@components/Store/loading';
import { useIdentityStore } from '@components/Store/identity';
import { useRatingStore } from '@components/Store/rating';
import axios, { AxiosError } from 'axios';
import { useFoodTimeStore } from '@components/Store/foodTime';
import { useScreenStore } from '@components/Store/screen';
import { usePopupStore } from '@components/Popup/store';

const ANIM_SHOW = { opacity: 1, scale: 1 };
const ANIM_HIDE = { opacity: 0, scale: 0.9 };

export interface ErrorResponse {
    code: string,
    message: string
}

export default function ContentHeadFinishBtn() {
    const { studentId, step } = useIdentityStore();
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
    
    const handleSubmit = async function() {
        if (step !== 'Star') return; // 어디 화면이여

        setLoadingActive(true);

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
            if (!success) return;
        }
        
        setLoadingActive(false);
        setScreen('Finish');
    }

    return <motion.button className={style.finish} initial={ANIM_HIDE} animate={ANIM_SHOW} exit={ANIM_HIDE} transition={{ bounce: true }} onClick={handleSubmit}>
        <img src={checkIcon} alt="finish" />
        완료하기
    </motion.button>;
}