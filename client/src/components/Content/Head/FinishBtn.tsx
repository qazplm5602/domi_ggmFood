import style from '@styles/content/style.module.scss';
import checkIcon from '@assets/icons/check.svg';

export default function ContentHeadFinishBtn() {
    return <button className={style.finish}>
        <img src={checkIcon} alt="finish" />
        완료하기
    </button>;
}