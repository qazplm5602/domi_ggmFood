import style from '@styles/content/style.module.scss';
import checkIcon from '@assets/icons/check.svg';
import { motion } from 'framer-motion';
import { useLoadingStore } from '@components/Store/loading';
import { useIdentityStore } from '@components/Store/identity';
import { useScreenStore } from '@components/Store/screen';
import useSaveRating from './ratingSave';
import useSaveTeacherRating from '@components/Teacher/ratingSave';
import { useTeacherMode } from '@components/Teacher/hooks';

const ANIM_SHOW = { opacity: 1, scale: 1 };
const ANIM_HIDE = { opacity: 0, scale: 0.9 };

export default function ContentHeadFinishBtn() {
    const { step } = useIdentityStore();
    const { setActive: setLoadingActive } = useLoadingStore();
    const { setScreen } = useScreenStore();
    const teacher = useTeacherMode();

    const requestStudentSaving = useSaveRating();
    const requestTeacherSaving = useSaveTeacherRating();

    const handleSubmit = async function() {
        if (step !== 'Star') return; // 어디 화면이여

        setLoadingActive(true);

        if (teacher)
            await requestTeacherSaving();
        else
            await requestStudentSaving();
        
        setLoadingActive(false);
        setScreen('Finish');
    }

    return <motion.button className={style.finish} initial={ANIM_HIDE} animate={ANIM_SHOW} exit={ANIM_HIDE} transition={{ bounce: true }} onClick={handleSubmit}>
        <img src={checkIcon} alt="finish" />
        완료하기
    </motion.button>;
}