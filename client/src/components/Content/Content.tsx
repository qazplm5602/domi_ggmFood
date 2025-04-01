import { useIdentityStore } from '@components/Store/identity';
import style from '@styles/content/style.module.scss';
import ContentHead from './Head/Head';
import ContentInteraction from './Interaction/Interaction';
import ContentGrade from './Grade/Grade';
import ContentClass from './Class/Class';
import ContentName from './Name/Name';

export default function Content() {
    const { step } = useIdentityStore();

    return <main className={style.main}>
        <ContentHead />

        <section className={style.content}>
            {step === 'Grade' && <ContentGrade />}
            {step === 'Class' && <ContentClass />}
            {step === 'Name' && <ContentName />}
        </section>
        
        <ContentInteraction />
    </main>;
}