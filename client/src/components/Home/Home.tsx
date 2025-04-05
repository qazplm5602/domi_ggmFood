import style from '@styles/home/style.module.scss';
import HomeLogo from "./Logo";
import HomeInfo from './Info';
import { useScreenStore } from '@components/Store/screen';
import { useIdentityStore } from '@components/Store/identity';
import { useTeacherMode } from '@components/Teacher/hooks';
import { useRatingStore } from '@components/Store/rating';

export default function Home() {
    const { setScreen } = useScreenStore();
    const { setStep } = useIdentityStore();
    const { reset: ratingClear } = useRatingStore();
    const teacher = useTeacherMode();
    

    const handleClick = function() {
        setScreen("Content");
        setStep(teacher ? "Star" : "Grade");
        
        if (teacher)
            ratingClear();
    }

    return <main className={style.main} onClick={handleClick}>
        <HomeLogo />
        <div className={style.touch}>진행하려면 화면을 터치하세요.</div>

        <HomeInfo />
    </main>;
}