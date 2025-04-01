import style from '@styles/content/rating.module.scss';
import ContentInputInteraction from './InputInteraction';

export default function ContentRatingInput() {
    return <div className={style.inputScreen}>
        <h1>기타 의견을 입력하세요.</h1>

        <input type="text" placeholder="의견을 입력하세요." />
        <ContentInputInteraction />
    </div>;
}