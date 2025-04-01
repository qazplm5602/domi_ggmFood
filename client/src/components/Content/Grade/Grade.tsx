import style from '@styles/content/style.module.scss';

export default function ContentGrade() {
    return <>
        <h2 className={style.title}>학년을 선택하세요.</h2>
        <article className={style.gradeList}>
            <button>1 학년</button>
            <button>2 학년</button>
            <button>3 학년</button>
        </article>
    </>;
}