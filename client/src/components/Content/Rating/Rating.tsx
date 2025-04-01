import Opinion from '@components/Opinion/Opinion';
import Star from '@components/Star/Star';
import style from '@styles/content/rating.module.scss';
import ContentRatingInput from './Input';

export default function ContentRating() {
    return <section className={style.screen}>
        <h2 className={style.headTitle}>김도미님, 오늘 석식은 어떠셨나요?</h2>
        <Star />
        <Opinion className={style.opinion} />

        <ContentRatingInput show={false} />
    </section>;
}