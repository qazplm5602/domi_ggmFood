import { useIdentityStore } from '@components/Store/identity';
import style from '@styles/content/style.module.scss';

export default function Content() {
    const { step } = useIdentityStore();

    return <main className={style.main}>
        
    </main>;
}