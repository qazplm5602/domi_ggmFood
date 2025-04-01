import style from '@styles/content/style.module.scss';
import logoImage from '@assets/images/logo.png';
import checkIcon from '@assets/icons/check.svg';

export default function ContentHead() {
    return <header className={style.head}>
        <div className={style.logo}>
            <img src={logoImage} alt='logo' />
            <h1>급식 평가</h1>
        </div>

        <button className={style.finish}>
            <img src={checkIcon} alt="finish" />
            완료하기
        </button>
    </header>;
}