import style from '@styles/content/rating.module.scss';

export default function ContentInputInteraction() {
    return <section className={style.interaction}>
        <button className={style.ok}>확인</button>
        <button>취소</button>
    </section>;
}