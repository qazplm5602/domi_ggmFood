import style from '@styles/content/style.module.scss';
import checkIcon from '@assets/icons/check.svg';
import { motion } from 'framer-motion';
import { useLoadingStore } from '@components/Store/loading';
import { useIdentityStore } from '@components/Store/identity';
import { useRatingStore } from '@components/Store/rating';
import axios from 'axios';
import { useFoodTimeStore } from '@components/Store/foodTime';
import { useScreenStore } from '@components/Store/screen';

const ANIM_SHOW = { opacity: 1, scale: 1 };
const ANIM_HIDE = { opacity: 0, scale: 0.9 };

export default function ContentHeadFinishBtn() {
    const { studentId, step } = useIdentityStore();
    const { id, star, opinions } = useRatingStore();
    const { setActive: setLoadingActive } = useLoadingStore();
    const { mode: foodTime } = useFoodTimeStore();
    const { setScreen } = useScreenStore();
    
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
            await axios.post("./api/rating", data);
        }
        
        setLoadingActive(false);
        setScreen('Finish');
    }

    return <motion.button className={style.finish} initial={ANIM_HIDE} animate={ANIM_SHOW} exit={ANIM_HIDE} transition={{ bounce: true }} onClick={handleSubmit}>
        <img src={checkIcon} alt="finish" />
        완료하기
    </motion.button>;
}