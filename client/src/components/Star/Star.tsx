import style from '@styles/star/style.module.scss';
import StarItem from './Item';
import { useRatingStore } from '@components/Store/rating';
import { useState } from 'react';

const MAX_STAR = 5; // 평점 최대 갯수

export default function Star() {
    const { star, setStar } = useRatingStore();
    const [ lastStar, setLastStar ] = useState(1);

    const handleStarClick = function(idx: number) {
        setLastStar(star);
        setStar(idx + 1);
    }
    
    return <article className={style.main}>
        <div className={style.list}>
            {Array.from(new Array(MAX_STAR)).map((_, i) => {
                const starNum = i + 1;
                const delay = Math.max(0, i - lastStar) * 100;

                return <StarItem key={i} active={starNum <= star} delay={delay} onClick={() => handleStarClick(i)} />
            })}
        </div>
        
        <p className={style.count}><span>1</span> / 5</p>
    </article>;
}