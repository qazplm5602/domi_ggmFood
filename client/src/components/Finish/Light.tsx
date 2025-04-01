import style from '@styles/finish/style.module.scss';
import { motion } from 'framer-motion';

export default function FinishLight() {
    return <section className={style.light}>
        <FadeLight className={style.big} delay={0.35}></FadeLight>
        <FadeLight className={style.small} delay={0.2}></FadeLight>
    </section>;
}

type Props = {
    className?: string,
    delay?: number
}

function FadeLight({ className, delay }: Props) {
    return <motion.div
        className={className}
        transition={{ delay: delay, duration: 1 }}
        initial={{ opacity: 0, zoom: 0.9 }}
        animate={{ opacity: 1, zoom: 1 }}
    >
    </motion.div>;
}