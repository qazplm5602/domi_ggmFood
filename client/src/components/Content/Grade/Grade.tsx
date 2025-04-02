import { useIdentityStore } from '@components/Store/identity';
import { useStudentStore } from '@components/Store/student';
import style from '@styles/content/style.module.scss';

export default function ContentGrade() {
    const { students } = useStudentStore();
    const { setStep, setGrade } = useIdentityStore();

    const handleClick = function(value: number) {
        setGrade(value);
        setStep('Class');
    }

    return <>
        <h2 className={style.title}>학년을 선택하세요.</h2>
        <article className={style.gradeList}>
            {(Object.keys(students)).map(v => <button key={v} onClick={() => handleClick(Number(v))}>{v} 학년</button>)}
        </article>
    </>;
}