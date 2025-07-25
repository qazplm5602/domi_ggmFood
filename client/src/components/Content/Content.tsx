import { useIdentityStore } from '@components/Store/identity';
import style from '@styles/content/style.module.scss';
import ContentHead from './Head/Head';
import ContentInteraction from './Interaction/Interaction';
import ContentGrade from './Grade/Grade';
import ContentClass from './Class/Class';
import ContentName from './Name/Name';
import ContentRating from './Rating/Rating';
import ContentIdleSys from './IdleSys/IdleSys';

export default function Content() {
    const { step } = useIdentityStore();

    return <main className={style.main}>
        <ContentHead />
        <ContentIdleSys />

        <section className={style.content}>
            {step === 'Grade' && <ContentGrade />}
            {step === 'Class' && <ContentClass />}
            {step === 'Name' && <ContentName />}
            {step === 'Star' && <ContentRating />}
        </section>
        
        <ContentInteraction />
    </main>;
}