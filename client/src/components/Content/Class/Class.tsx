import style from '@styles/content/style.module.scss';

export default function ContentClass() {
    return <>
        <h2 className={style.title}>반을 선택하세요.</h2>

        <article className={style.classList}>
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
        </article>
    </>;
}