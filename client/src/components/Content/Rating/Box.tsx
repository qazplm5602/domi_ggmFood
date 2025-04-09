import style from '@styles/content/rating.module.scss';
import ContentInputInteraction from './InputInteraction';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useRatingStore } from '@components/Store/rating';
import { useLoadingStore } from '@components/Store/loading';
import { usePopupStore } from '@components/Popup/store';

type Props = {
    onClose?: () => void
}

const MAX_TEXT_SIZE = 255;

export default function ContentRatingInputBox({ onClose }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    const { addOpinion } = useRatingStore();
    const [ value, setValue ] = useState("");
    const { setActive: setLoadingActive } = useLoadingStore();
    const { openPopup } = usePopupStore();

    const handleClose = function() {
        if (onClose)
            onClose();
    }
    const handleSubmit = function() {
        setLoadingActive(true);

        // 넣기기
        if (value.length > 0) {
            if (value.length > MAX_TEXT_SIZE) {
                const content = <>
                    <p>할말이 많으신가요?</p>
                    <p>기타는 짧게 나눠서 입력할 수 있습니다.</p>
                </>;
                openPopup("너어어어어어어어무 길어요.", content, [ { text: "확인", callback() {} } ]);
                setLoadingActive(false); // 자리비움 막기
                return;
            }

            addOpinion(value);
        }

        setLoadingActive(false); // 자리비움 막기
        handleClose();
    }
    const handleChangeValue = function(e: React.ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value);
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

        <input type="text" placeholder="의견을 입력하세요." ref={inputRef} value={value} onChange={handleChangeValue} />
        <ContentInputInteraction onSubmit={handleSubmit} onClose={handleClose} />
    </motion.div>;
}