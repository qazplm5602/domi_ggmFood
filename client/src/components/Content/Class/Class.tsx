import { useIdentityStore } from '@components/Store/identity';
import { useStudentStore } from '@components/Store/student';
import style from '@styles/content/style.module.scss';

export default function ContentClass() {
    const { grade, setClass, setStep } = useIdentityStore();
    const { classes: classList } = useStudentStore();
    const classes = classList[grade];
    
    const handleClassClick = function(value: number) {
        setClass(value);
        setStep("Name");
    }

    return <>
        <h2 className={style.title}>반을 선택하세요.</h2>

        <article className={style.classList}>
            {classes.map((v, i) => <button key={v} style={{ animationDelay: `${i * 100}ms` }} onClick={() => handleClassClick(v)}>{v}</button>)}
        </article>
    </>;
}