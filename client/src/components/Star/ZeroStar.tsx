import { usePopupStore } from '@components/Popup/store';
import style from '@styles/star/style.module.scss';

export default function StarZero() {
    const { openPopup, closePopup } = usePopupStore();

    const handleClick = function() {
        // alert("예? 0점이요?");
        openPopup("진짜요????", "예? 0점이요?", [
            { text: "다시 한번 생각해봐요.", callback: closePopup }
        ]);
        // alert 말고 다른 방법으로 해야함  (wallpanel 버그 있음)
    }

    return <button className={`${style.item} ${style.zero}`} onClick={handleClick}>
    </button>;
}