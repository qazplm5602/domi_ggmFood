// import { usePopupStore } from '@components/Popup/store';
import { useIdentityStore } from '@components/Store/identity';
import { useRatingStore } from '@components/Store/rating';
import { useStudentStore } from '@components/Store/student';
import style from '@styles/content/style.module.scss';

export default function ContentName() {
    const { grade, class: classNum, setStudentId, setStep } = useIdentityStore();
    const { students } = useStudentStore();
    const { reset: ratingReset } = useRatingStore();
    // const { openPopup } = usePopupStore();

    const handleClick = function(id: number) {
        setStudentId(id);

        // 여기에서 초기화 점
        ratingReset();

        setStep('Star');
    }

    return <>
        <h2 className={style.title}>이름을 선택하세요.</h2>
        
        <article className={style.nameList}>
            {students[grade][classNum].map((v, i) => <button key={v.id} style={{ animationDelay: `${i * 10}ms` }} onClick={() => handleClick(v.id)}>{v.name}</button>)}
        </article>
    </>;
}