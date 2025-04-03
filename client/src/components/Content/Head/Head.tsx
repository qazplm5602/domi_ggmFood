import style from '@styles/content/style.module.scss';
import logoImage from '@assets/images/logo.png';
import { useScreenStore } from '@components/Store/screen';
import { useIdentityStore } from '@components/Store/identity';
import ContentHeadFinishBtn from './FinishBtn';
import { AnimatePresence } from 'framer-motion';

export default function ContentHead() {
    const { step } = useIdentityStore();
    const { screen } = useScreenStore();
    
    const isScreenRating = screen === 'Content' && step === 'Star';
    

    return <header className={style.head}>
        <div className={style.logo}>
            <img src={logoImage} alt='logo' />
            <h1>급식 평가</h1>
        </div>

        <AnimatePresence>
            {isScreenRating && <ContentHeadFinishBtn />}
        </AnimatePresence>
    </header>;
}