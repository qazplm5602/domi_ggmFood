import style from '@styles/content/style.module.scss';

import arrowIcon from '@assets/icons/left-arrow.svg';

export default function ContentInteraction() {
    return <section className={style.interaction}>
        <button className={style.back}><img src={arrowIcon} alt='back' />뒤로가기</button>
    </section>;
}