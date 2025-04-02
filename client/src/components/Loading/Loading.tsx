import Spinner from '@components/Spinner/Spinner';
import { useLoadingStore } from '@components/Store/loading';
import style from '@styles/studentSys/style.module.scss';

export default function LoadingScreen() {
    const { loading } = useLoadingStore();

    // 안그려 ㅁㄴㅇㄹ
    if (!loading)
        return null;

    return <section className={style.screenBg}>
        <div className={style.loading}>
            <Spinner className={style.spinner} />
            <p>도미가 구르는중...</p>
        </div>
    </section>;
}