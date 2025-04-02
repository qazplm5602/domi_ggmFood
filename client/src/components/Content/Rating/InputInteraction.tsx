import style from '@styles/content/rating.module.scss';

type Props = {
    onSubmit?: () => void,
    onClose?: () => void
}

export default function ContentInputInteraction({ onSubmit, onClose }: Props) {
    return <section className={style.interaction}>
        <button className={style.ok} onClick={onSubmit}>확인</button>
        <button onClick={onClose}>취소</button>
    </section>;
}