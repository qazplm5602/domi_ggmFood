import style from '@styles/content/rating.module.scss';
import ContentRatingInputBox from './Box';
import { AnimatePresence, motion } from 'framer-motion';

type Props = {
    show: boolean
}

export default function ContentRatingInput({ show }: Props) {
    return <AnimatePresence>
        {show && <motion.div
                    className={style.inputScreen}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
            <ContentRatingInputBox />
        </motion.div>}
    </AnimatePresence>;
}