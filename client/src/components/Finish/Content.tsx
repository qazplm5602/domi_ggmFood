import style from '@styles/finish/style.module.scss';
import FinishHomeRedirect from './HomeRedirect';
import { motion } from 'framer-motion';

export default function FinishContent() {
    return <section className={style.screen}>
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>참여해주셔서 감사합니다.</motion.h1>
        <FinishHomeRedirect />
    </section>;
}