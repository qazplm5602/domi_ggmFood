import Content from "@components/Content/Content";
import Finish from "@components/Finish/Finish";
import Home from "@components/Home/Home";
import { useScreenStore } from "@components/Store/screen";
import StudentSys from "@components/StudentSys/StudentSys";

export default function App() {
    const { screen } = useScreenStore();

    return <>
        {/* 시스템 */}
        <StudentSys />

        {screen === 'Home' && <Home />}
        {screen === 'Content' && <Content />}
        {screen === 'Finish' && <Finish />}
    </>;
}