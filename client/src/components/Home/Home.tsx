import style from '@styles/home/style.module.scss';
import HomeLogo from "./Logo";
import HomeInfo from './Info';

export default function Home() {
    return <main>
        <HomeLogo />
        <div className={style.touch}>진행하려면 화면을 터치하세요.</div>

        <HomeInfo />
    </main>;
}