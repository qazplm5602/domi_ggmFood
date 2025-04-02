import style from '@styles/content/style.module.scss';

import arrowIcon from '@assets/icons/left-arrow.svg';
import homeIcon from '@assets/icons/home.svg';
import { useIdentityStore } from '@components/Store/identity';
import { useScreenStore } from '@components/Store/screen';

export default function ContentInteraction() {
    const { step, setStep } = useIdentityStore();
    const { setScreen } = useScreenStore();

    const handleBack = function() {
        switch (step) {
            case 'Star':
                setStep('Name');
                break;
            case 'Name':
                setStep('Class');
                break;
            case 'Class':
                setStep('Grade');
                break;
            case 'Grade':
                handleGoHome();
                break;
            default:
                break;
        }
    }
    
    const handleGoHome = function() {
        setScreen('Home');
    }

    return <section className={style.interaction}>
        <button className={style.back} onClick={handleBack}><img src={arrowIcon} alt='back' />뒤로가기</button>
        <button className={style.home} onClick={handleGoHome}><img src={homeIcon} alt="home" /></button>
    </section>;
}