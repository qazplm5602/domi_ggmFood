import Opinion from '@components/Opinion/Opinion';
import Star from '@components/Star/Star';
import style from '@styles/content/rating.module.scss';
import ContentRatingInput from './Input';
import { useState } from 'react';

export default function ContentRating() {
    const [ inputShow, setInputShow ] = useState(false);
    const handleOpenInput = function() {
        setInputShow(true);
    }
    const handleCloseInput = function() {
        setInputShow(false);
    }

    return <section className={style.screen}>
        <h2 className={style.headTitle}>김도미님, 오늘 석식은 어떠셨나요?</h2>
        <Star />
        <Opinion className={style.opinion} onOpenInput={handleOpenInput}  />

        <ContentRatingInput show={inputShow} onClose={handleCloseInput} />
    </section>;
}