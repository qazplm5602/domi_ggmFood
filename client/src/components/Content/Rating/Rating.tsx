import Opinion from '@components/Opinion/Opinion';
import Star from '@components/Star/Star';
import style from '@styles/content/rating.module.scss';
import ContentRatingInput from './Input';
import { useMemo, useState } from 'react';
import { useStudentStore } from '@components/Store/student';
import { useIdentityStore } from '@components/Store/identity';
import { useRatingStore } from '@components/Store/rating';
import { getFoodTimeDisplayName, useFoodTimeStore } from '@components/Store/foodTime';
import { useTeacherMode } from '@components/Teacher/hooks';

export default function ContentRating() {
    // 학생 store
    const { grade, class: classNum, studentId } = useIdentityStore();
    const { students } = useStudentStore();
    const currentStudent = useMemo(() => {
        if (!students[grade] || !students[grade][classNum]) return;
        return students[grade][classNum].find(v => v.id === studentId);
    }, [students, grade, classNum, studentId]);
    
    // 교사 store
    const teacherMode = useTeacherMode();

    const [ inputShow, setInputShow ] = useState(false);
    const { mode: currentFoodTime } = useFoodTimeStore();
    const { foodTime: savedFoodTime } = useRatingStore();

    const foodTime = savedFoodTime || currentFoodTime;

    const handleOpenInput = function() {
        setInputShow(true);
    }
    const handleCloseInput = function() {
        setInputShow(false);
    }

    if (!currentStudent && !teacherMode) {
        return <h1>오류 :( / currentStudent variable undefined</h1>;
    }

    return <section className={style.screen}>
        <h2 className={style.headTitle}>{teacherMode ? '선생' : currentStudent?.name}님, 오늘 {getFoodTimeDisplayName(foodTime)}은 어떠셨나요?</h2>
        <Star />
        <Opinion className={style.opinion} onOpenInput={handleOpenInput}  />

        <ContentRatingInput show={inputShow} onClose={handleCloseInput} />
    </section>;
}