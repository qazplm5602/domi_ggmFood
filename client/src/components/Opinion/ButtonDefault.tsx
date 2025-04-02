import style from '@styles/opinion/style.module.scss';
import { useMemo } from "react";
import { useRatingStore } from "@components/Store/rating";

type Props = {
    content: string
}

export default function OpinionButtonDefault({ content }: Props) {
    const { opinions, addOpinion, removeOpinion } = useRatingStore();
    const menuIdx = useMemo(() => opinions.findIndex(v => v === content), [ opinions ]);
    const active = menuIdx !== -1;

    const handleClick = function() {
        if (active)
            removeOpinion(menuIdx);
        else
            addOpinion(content);
    }

    return <button className={active ? style.active : ''} onClick={handleClick}>{content}</button>;
}