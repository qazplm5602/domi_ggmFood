import { usePopupStore } from '@components/Popup/store';
import { useFoodTimeStore } from '@components/Store/foodTime';
import { useIdentityStore } from '@components/Store/identity';
import { useLoadingStore } from '@components/Store/loading';
import { RatingDetail, useRatingStore } from '@components/Store/rating';
import { useStudentStore } from '@components/Store/student';
import style from '@styles/content/style.module.scss';
import axios from 'axios';

export default function ContentName() {
    const { grade, class: classNum, setStudentId, setStep } = useIdentityStore();
    const { students } = useStudentStore();
    const { reset: ratingReset, dataLoad: ratingDataLoad } = useRatingStore();
    const { setActive: setLoadingActive } = useLoadingStore();
    const { mode: foodTime } = useFoodTimeStore();
    const { openPopup, closePopup } = usePopupStore();

    const alreadyAlert = function(ratingId: number) {
        const handleEdit = async function() {
            setLoadingActive(true);
            
            const response = await axios.get<RatingDetail>("./api/rating/detail", { params: { id: ratingId } });
            
            setLoadingActive(false);

            ratingDataLoad(ratingId, response.data);
            setStep('Star');
        }

        openPopup("이미 되어있어요.", <>
            <p>이미 평가를 하셨습니다.</p>
            <p>수정하실래요?</p>
        </>, [
            { text: "수정", color: "#3283D5", callback: handleEdit },
            { text: "취소", callback: closePopup }
        ]);
    }

    const hasAlreadyRating = async function(student: number) {
        setLoadingActive(true);

        const response = await axios.get<string>("./api/rating", { params: { student, mode: foodTime } });
        const ratingId = Number(response.data);

        setLoadingActive(false);
        
        // 이미 했는디ㅣㅣㅣ
        if (!isNaN(ratingId) && ratingId !== -1) {
            alreadyAlert(ratingId);
            return;
        }

        ratingReset();
        setStep('Star');
    }

    const handleClick = async function(id: number) {
        setStudentId(id);
        
        hasAlreadyRating(id);

        // 여기에서 초기화 점
        // ratingReset();

        // setStep('Star');
    }

    return <>
        <h2 className={style.title}>이름을 선택하세요.</h2>
        
        <article className={style.nameList}>
            {students[grade][classNum].map((v, i) => <button key={v.id} style={{ animationDelay: `${i * 10}ms` }} onClick={() => handleClick(v.id)}>{v.name}</button>)}
        </article>
    </>;
}