import style from '@styles/star/style.module.scss';
import StarItem from './Item';

export default function Star() {
    return <article className={style.main}>
        <div className={style.list}>
            <StarItem />
            <StarItem />
            <StarItem />
            <StarItem />
            <StarItem />
        </div>
        
        <p className={style.count}><span>1</span> / 5</p>
    </article>;
}