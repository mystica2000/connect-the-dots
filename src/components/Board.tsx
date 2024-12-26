import { useState } from "react";

export function Board() {

    const [edges, setEdges] = useState(new Set());

    const handleEdgeClick = (row: number, col: number, edge: "top" | "bottom" | "left" | "right") => {
        console.log("HANDLING EDGE CLICKEYYY - ", row, col, edge);


        let edgeKey: string = "";

        if (edge == "top") {
            edgeKey = `${row},${col},top`;
        } else if (edge == "bottom") {
            if (row == 7) {
                edgeKey = `${row},${col},top`;
            } else {
                edgeKey = `${row + 1},${col},top`;
            }
        }

        if (edge == "left") {
            edgeKey = `${row},${col},left`;
        } else if (edge == "right") {
            if (col == 7) {
                edgeKey = `${row},${col},left`;
            } else {
                edgeKey = `${row},${col + 1},left`;
            }
        }

        if (edges.has(edgeKey)) {
            console.log("OHHHH")
            return;
        } else {
            console.log("OMG NEW");
        }

        setEdges(prev => new Set(prev.add(edgeKey)));
    }

    return <section className="border-2 border-lime-200">
        {
            Array(8).fill(0).map((_, row) => (
                <div key={row} className="flex">
                    {Array(8).fill(0).map((_, col) => {
                        return (
                            <div key={col} className="relative w-20 h-20 border">

                                {/* top */}
                                <div className={`absolute top-0 left-0 w-full h-0.5 bg-lime-200 cursor-pointer`} onClick={(e) => handleEdgeClick(row, col, "top")}>
                                </div>

                                {/* right */}
                                <div className={`absolute top-0 right-0 w-0.5 h-full bg-lime-200 cursor-pointer`} onClick={(e) => handleEdgeClick(row, col, "right")}></div>

                                {/* left */}
                                <div className={`absolute top-0 left-0 w-0.5 h-full bg-lime-200 cursor-pointer`} onClick={(e) => handleEdgeClick(row, col, "left")}>
                                </div>

                                {/* bottom */}
                                <div className={`absolute bottom-0 left-0 h-0.5 w-full bg-lime-200 cursor-pointer`} onClick={(e) => handleEdgeClick(row, col, "bottom")}>

                                </div>
                            </div>
                        )
                    })}
                </div>

            ))
        }

    </section>
}