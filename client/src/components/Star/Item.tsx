import style from '@styles/star/style.module.scss';
import { AnimatePresence, motion } from 'framer-motion';

import starMist from '@assets/icons/star-mist.svg';
import starWhite from '@assets/icons/star-white.svg';
import starOrange from '@assets/icons/star-orange.svg';

type Props = {
    active: boolean,
    onClick?: () => void
}

export default function StarItem({ active, onClick }: Props) {
    return <button className={style.item} onClick={onClick}>
        <img src={active ? starOrange : starMist} alt="star" />
        
        {/* (이한)별 효과 */}
        {active && <img src={starWhite} alt="star" className={style.effect} />}
    </button>;
}