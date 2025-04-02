import style from '@styles/home/style.module.scss';

export default function HomeInfo() {
    return <section className={style.info}>
        <div className={style.copyright}>ⓒ 2025. domi All rights reserved.</div>
        <div className={style.build}>빌드 v0.0.1 - 2025-03-31 19:50:29<br></br>본 애플리케이션은 학교 내 사용만을 목적으로 하며, 외부에서는 사용할 수 없습니다.</div>
    </section>;
}