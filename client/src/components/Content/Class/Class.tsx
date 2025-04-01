import style from '@styles/content/style.module.scss';

export default function ContentClass() {
    return <>
        <h2 className={style.title}>반을 선택하세요.</h2>

        <article className={style.classList}>
            <button style={{ animationDelay: '0ms' }}>1</button>
            <button style={{ animationDelay: '100ms' }}>2</button>
            <button style={{ animationDelay: '200ms' }}>3</button>
            <button style={{ animationDelay: '300ms' }}>4</button>
        </article>
    </>;
}