import { useScreenStore } from "@components/Store/screen";

export default function App() {
    const { screen } = useScreenStore();

    return <main>
        <h1>now screen: {screen}</h1>
    </main>;
}