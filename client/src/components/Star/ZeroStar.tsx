import style from '@styles/star/style.module.scss';

export default function StarZero() {
    const handleClick = function() {
        // alert("예? 0점이요?");
        // alert 말고 다른 방법으로 해야함  (wallpanel 버그 있음)
    }

    return <button className={`${style.item} ${style.zero}`} onClick={handleClick}>
    </button>;
}