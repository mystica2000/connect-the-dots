export default function StartOptions() {
    return (
        <section className="flex flex-row gap-10">
            <select className="border-spacing-1 border-indigo-500 border-2">
                <option>8x8</option>
                <option>16x16</option>
                <option>32x32</option>
                <option>64x64</option>
            </select>
            <button className="border-2 border-green-500 p-1 bg-lime-500">Start</button>
        </section>
    );
}
