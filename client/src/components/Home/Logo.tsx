import style from '@styles/home/style.module.scss';
import logoImage from '@assets/images/logo.png';

export default function HomeLogo() {
    return <section className={style.logo}>
        <img src={logoImage} alt="logo" />
        <h1>급식 평가</h1>
    </section>;
}