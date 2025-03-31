import style from '@styles/content/style.module.scss';
import logoImage from '@assets/images/logo.png';

export default function ContentHead() {
    return <header className={style.head}>
        <div className={style.logo}>
            <img src={logoImage} alt='logo' />
            <h1>급식 평가</h1>
        </div>
    </header>;
}