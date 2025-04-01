import style from '@styles/content/style.module.scss';

export default function ContentName() {
    return <>
        <h2 className={style.title}>이름을 선택하세요.</h2>
        
        <article className={style.nameList}>
            {Array.from(new Array(21)).map((_, i) => <button key={i} style={{ animationDelay: `${i * 10}ms` }}>김도미</button>)}
        </article>
    </>;
}