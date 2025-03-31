import Home from "@components/Home/Home";
import { useScreenStore } from "@components/Store/screen";

export default function App() {
    const { screen } = useScreenStore();

    return <>
        {screen === 'Home' && <Home />}
    </>;
}