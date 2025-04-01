import starMist from '@assets/icons/star-mist.svg';
import style from '@styles/star/style.module.scss';

export default function StarItem() {
    return <button className={style.item}>
        <img src={starMist} alt="star" />
    </button>;
}