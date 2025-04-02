import style from '@styles/opinion/style.module.scss';
import OpinionButtonDefault from './ButtonDefault';

type Props = {
    className?: string,
    onOpenInput?: () => void
}

const defaultOpinions = [
    "음식이 너무 짜요",
    "국이 없어요",
    "너무 매워요",
    "너무 느끼해요",
    "생선이 싫어요"
];

export default function Opinion({ className, onOpenInput }: Props) {
    return <div className={`${style.box} ${className || ''}`}>
        <h3>의견</h3>

        <section className={style.list}>
            {defaultOpinions.map(v => <OpinionButtonDefault key={`default-${v}`} content={v} />)}
            <button onClick={onOpenInput}>기타</button>
        </section>
    </div>
}