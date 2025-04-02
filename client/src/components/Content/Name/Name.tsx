import { useIdentityStore } from '@components/Store/identity';
import { useStudentStore } from '@components/Store/student';
import style from '@styles/content/style.module.scss';

export default function ContentName() {
    const { grade, class: classNum, setStudentId, setStep } = useIdentityStore();
    const { students } = useStudentStore();

    const handleClick = function(id: number) {
        setStudentId(id);
        setStep('Star');
    }

    return <>
        <h2 className={style.title}>이름을 선택하세요.</h2>
        
        <article className={style.nameList}>
            {students[grade][classNum].map((v, i) => <button key={v.id} style={{ animationDelay: `${i * 10}ms` }} onClick={() => handleClick(v.id)}>{v.name}</button>)}
        </article>
    </>;
}