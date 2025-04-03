import { useScreenStore } from '@components/Store/screen';
import style from '@styles/finish/style.module.scss';
import { useEffect, useState } from 'react';

export default function FinishHomeRedirect() {
    const [ time, setTime ] = useState(5);
    const { setScreen } = useScreenStore();

    const goHome = function() {
        setScreen('Home');
    }

    const timer = function() {
        setTime(prev => {
            if (prev - 1 < 0) {
                setScreen('Home');
                return prev;
            }

            return prev - 1;
        });
    }

    useEffect(() => {
        const handle = setInterval(timer, 1000);
        
        return () => {
            clearInterval(handle);
        }
    }, []);

    return <article className={style.interaction}>
        <p>{time}초 후에 홈 화면으로 돌아갑니다.</p>
        <button onClick={goHome}>홈으로</button>
    </article>;
}