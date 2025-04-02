import Content from "@components/Content/Content";
import Finish from "@components/Finish/Finish";
import Home from "@components/Home/Home";
import LoadingScreen from "@components/Loading/Loading";
import LunchTimeSys from "@components/FoodTimeSys/FoodTimeSys";
import Popup from "@components/Popup/Popup";
import { useScreenStore } from "@components/Store/screen";
import StudentSys from "@components/StudentSys/StudentSys";

export default function App() {
    const { screen } = useScreenStore();

    return <>
        {/* 시스템 */}
        <StudentSys />
        <LoadingScreen />
        <Popup />
        <LunchTimeSys />

        {screen === 'Home' && <Home />}
        {screen === 'Content' && <Content />}
        {screen === 'Finish' && <Finish />}
    </>;
}