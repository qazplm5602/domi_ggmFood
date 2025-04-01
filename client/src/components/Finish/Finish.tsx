import style from '@styles/finish/style.module.scss';
import FinishContent from './Content';

export default function Finish() {
    return <main>
        <section className={style.light}>
            <div className={style.big}></div>
            <div className={style.small}></div>
        </section>
        <FinishContent />
    </main>;
}