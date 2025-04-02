import style from '@styles/content/rating.module.scss';
import ContentInputInteraction from './InputInteraction';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

type Props = {
    onClose?: () => void
}

export default function ContentRatingInputBox({ onClose }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClose = function() {
        if (onClose)
            onClose();
    }
    const handleSubmit = function() {
        handleClose();
    }

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return <motion.div
            className={style.box}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
        >
        <h1>기타 의견을 입력하세요.</h1>

        <input type="text" placeholder="의견을 입력하세요." ref={inputRef} />
        <ContentInputInteraction onSubmit={handleSubmit} onClose={handleClose} />
    </motion.div>;
}