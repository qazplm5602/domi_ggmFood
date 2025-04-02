import style from '@styles/star/style.module.scss';
import StarItem from './Item';

export default function Star() {
    return <article className={style.main}>
        <div className={style.list}>
            <StarItem active={true} />
            <StarItem active={false} />
            <StarItem active={false} />
            <StarItem active={false} />
            <StarItem active={false} />
        </div>
        
        <p className={style.count}><span>1</span> / 5</p>
    </article>;
}