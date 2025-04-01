import style from '@styles/opinion/style.module.scss';

type Props = {
    className?: string
}

export default function Opinion({ className }: Props) {
    return <div className={`${style.box} ${className || ''}`}>
        <h3>의견</h3>

        <section className={style.list}>
            <button>음식이 너무 짜요</button>
            <button>국이 없어요</button>
            <button>너무 매워요</button>
            <button>너무 느끼해요</button>
            <button className={style.active}>생선이 싫어요</button>
            <button>기타</button>
        </section>
    </div>
}