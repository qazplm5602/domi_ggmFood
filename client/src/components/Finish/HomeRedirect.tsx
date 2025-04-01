import style from '@styles/finish/style.module.scss';

export default function FinishHomeRedirect() {
    return <article className={style.interaction}>
        <p>5초 후 홈 화면으로 이동합니다.</p>
        <button>홈으로</button>
    </article>;
}