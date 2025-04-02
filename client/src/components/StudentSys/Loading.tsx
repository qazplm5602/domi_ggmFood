import Spinner from '@components/Spinner/Spinner';
import style from '@styles/studentSys/style.module.scss';

export default function StudentSysLoading() {
    return <section className={style.screenBg}>
        <div className={style.loading}>
            <Spinner className={style.spinner} />
            <p>도미가 구르는중...</p>
        </div>
    </section>;
}