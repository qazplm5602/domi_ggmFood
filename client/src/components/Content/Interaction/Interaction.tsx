import style from '@styles/content/style.module.scss';

import arrowIcon from '@assets/icons/left-arrow.svg';
import homeIcon from '@assets/icons/home.svg';

export default function ContentInteraction() {
    return <section className={style.interaction}>
        <button className={style.back}><img src={arrowIcon} alt='back' />뒤로가기</button>
        <button className={style.home}><img src={homeIcon} alt="home" /></button>
    </section>;
}