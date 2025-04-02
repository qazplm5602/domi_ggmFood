import style from '@styles/opinion/style.module.scss';
import OpinionButtonDefault from './ButtonDefault';
import { useRatingStore } from '@components/Store/rating';

type Props = {
    className?: string,
    onOpenInput?: () => void
}

const defaultOpinions = [
    "음식이 너무 짜요",
    "국이 없어요",
    "너무 매워요",
    "너무 느끼해요",
    "음식이 차가워요",
    "튀김이 눅눅해요",
    "생선이 싫어요 (도미 아님)",
    "음식 갯수가 적어요 (제한된 갯수)",
];
const defaultMenuSet = new Set<string>(defaultOpinions);

export default function Opinion({ className, onOpenInput }: Props) {
    const { opinions, removeOpinion } = useRatingStore();
    const handleRemoveOpinion = function(idx: number) {
        removeOpinion(idx);
    }

    return <div className={`${style.box} ${className || ''}`}>
        <h3>의견</h3>

        <section className={style.list}>
            {defaultOpinions.map(v => <OpinionButtonDefault key={`default-${v}`} content={v} />)}
            {opinions.map((v, i) => {
                if (defaultMenuSet.has(v)) // 이미 있는 메뉴는 제외
                    return;

                return <button key={`custom-${v}`} className={style.active} onClick={() => handleRemoveOpinion(i)}>{v}</button>;
            })}
            <button onClick={onOpenInput}>기타</button>
        </section>
    </div>
}