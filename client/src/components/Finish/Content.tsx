import style from '@styles/finish/style.module.scss';
import FinishHomeRedirect from './HomeRedirect';

export default function FinishContent() {
    return <section className={style.screen}>
        <h1>참여해주셔서 감사합니다.</h1>
        <FinishHomeRedirect />
    </section>;
}