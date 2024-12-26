import { Board } from "./Board";
import StartOptions from "./StartOptions";

export default function Content() {
    return (
        <main className="my-10 flex justify-center flex-col items-center gap-4">
            <StartOptions />
            <Board />
        </main>
    );
}
