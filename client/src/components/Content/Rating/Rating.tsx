import Opinion from '@components/Opinion/Opinion';
import Star from '@components/Star/Star';
import style from '@styles/content/rating.module.scss';
import ContentRatingInput from './Input';
import { useMemo, useState } from 'react';
import { useStudentStore } from '@components/Store/student';
import { useIdentityStore } from '@components/Store/identity';
import { useRatingStore } from '@components/Store/rating';
import { getFoodTimeDisplayName, useFoodTimeStore } from '@components/Store/foodTime';

export default function ContentRating() {
    const [ inputShow, setInputShow ] = useState(false);
    const { grade, class: classNum, studentId } = useIdentityStore();
    const { students } = useStudentStore();
    const currentStudent = useMemo(() => students[grade][classNum].find(v => v.id === studentId), [grade, classNum, studentId]);

    const { mode: currentFoodTime } = useFoodTimeStore();
    const { foodTime: savedFoodTime } = useRatingStore();

    const foodTime = savedFoodTime || currentFoodTime;

    const handleOpenInput = function() {
        setInputShow(true);
    }
    const handleCloseInput = function() {
        setInputShow(false);
    }

    if (!currentStudent) {
        return <h1>오류 :( / currentStudent variable undefined</h1>;
    }

    return <section className={style.screen}>
        <h2 className={style.headTitle}>{currentStudent.name}님, 오늘 {getFoodTimeDisplayName(foodTime)}은 어떠셨나요?</h2>
        <Star />
        <Opinion className={style.opinion} onOpenInput={handleOpenInput}  />

        <ContentRatingInput show={inputShow} onClose={handleCloseInput} />
    </section>;
}