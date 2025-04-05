import style from '@styles/home/style.module.scss';
import logoImage from '@assets/images/logo.png';
import { useTeacherMode } from '@components/Teacher/hooks';

export default function HomeLogo() {
    const teacher = useTeacherMode();

    return <section className={style.logo}>
        <img src={logoImage} alt="logo" />
        <h1>급식 평가</h1>
        {teacher && <div className={style.teacher}>(교사용)</div>}
    </section>;
}