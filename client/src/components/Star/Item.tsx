import style from '@styles/star/style.module.scss';

import starMist from '@assets/icons/star-mist.svg';
import starWhite from '@assets/icons/star-white.svg';
import starOrange from '@assets/icons/star-orange.svg';
import starRed from '@assets/icons/star-red.svg';
import { useEffect, useRef, useState } from 'react';

type Props = {
    active: boolean,
    onClick?: () => void,
    delay?: number
}

export default function StarItem({ active, delay = 0, onClick }: Props) {
    const [ starActive, setStarActive ] = useState(false);
    const [ red, setRed ] = useState(false);
    const lastActiveRef = useRef(active);

    useEffect(() => {
        if (lastActiveRef.current != active) {
            setRed(!active);
            lastActiveRef.current = active;
        }

        if (!active) {
            setStarActive(false);
            return;
        }

        const timeHandler = setTimeout(() => {
            setStarActive(true);
        }, delay + 300);

        return () => {
            clearTimeout(timeHandler);
        }
    }, [ active ]);

    return <button className={style.item} onClick={onClick}>
        <img src={starActive ? starOrange : starMist} alt="star" />
        {red && <img src={starRed} className={style.red} />}
        
        {/* (이한)별 효과 */}
        {active && <img src={starWhite} alt="star" className={style.effect} style={{ animationDelay: `${delay}ms` }} />}
    </button>;
}