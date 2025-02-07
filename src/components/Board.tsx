import { useEffect, useState } from "react";

export function Board() {

    const [edges, setEdges] = useState(new Set());
    const [hoveredEdges, setHoveredEdges] = useState<string[]>([]);
    const [score, setScore] = useState(0);

    useEffect(() => {

        let square = 0;
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (hasFullSquare(i, j)) {
                    square++;
                }
            }
        }

        setScore(square);

    }, [edges]);

    const handleEdgeClick = (row: number, col: number, edge: "top" | "bottom" | "left" | "right") => {
        console.log("HANDLING EDGE CLICKEYYY - ", row, col, edge);

        const edgeKey = `${row},${col},${edge}`;
        const adjacentEdge = getAdjacentEdge(row, col, edge);
        const edgeKeys = adjacentEdge ? [edgeKey, adjacentEdge] : [edgeKey];

        if (adjacentEdge != null) {
            edgeKeys.push(adjacentEdge);
        }

        if (edgeKeys.some((aEdge) => edges.has(aEdge))) {
            return;
        }

        setEdges(prev => {
            const previousSet = new Set(prev);
            edgeKeys.forEach((aEdge) => previousSet.add(aEdge));
            return previousSet
        });


        console.log("what ??? ", hasFullSquare(row, col), row, col);
        if (hasFullSquare(row, col) || (adjacentEdge && hasFullSquare(Number(adjacentEdge.split(",")[0]), Number(adjacentEdge?.split(",")[1])))) {

            console.log("ok??!!");
            setScore((score) => score + 1);
        }


    }

    const getAdjacentEdge = (row: number, col: number, edge: "top" | "bottom" | "left" | "right"): string | null => {
        switch (edge) {
            case "top": {
                if (row > 0) return `${row - 1},${col},bottom`;
                break;
            }
            case "bottom": {
                if (row < 7) return `${row + 1},${col},top`;
                break;
            }
            case "left": {
                if (col > 0) return `${row},${col - 1},right`;
                break;
            }
            case "right": {
                if (col < 7) return `${row},${col + 1},left`;
                break;
            }
        }
        return null;
    };

    const handleMouseEntered = (row: number, col: number, edge: "top" | "bottom" | "left" | "right") => {
        const edgeKey = `${row},${col},${edge}`;
        const adjacentEdge = getAdjacentEdge(row, col, edge);
        setHoveredEdges(adjacentEdge ? [edgeKey, adjacentEdge] : [edgeKey]);
    }

    const handleMouseLeave = () => {
        setHoveredEdges([]);
    };

    const hasFullSquare = (row: number, col: number) => {
        return edges.has(`${row},${col},top`) && edges.has(`${row},${col},bottom`) && edges.has(`${row},${col},left`) && edges.has(`${row},${col},right`)
    }

    return <main>
        {score}
        <section className="border-2 border-lime-200">
            {
                Array(8).fill(0).map((_, row) => (
                    <div key={row} className="flex">
                        {Array(8).fill(0).map((_, col) => {
                            return (
                                <div key={col} className={`relative w-20 h-20 ${hasFullSquare(row, col) ? 'bg-black' : ''}`}>

                                    <div className={`absolute inset-0 border-2 pointer-events-none
                                    ${edges.has(`${row},${col},top`) ? 'border-t-blue-600' : hoveredEdges.includes(`${row},${col},top`) ? 'border-t-blue-200' : 'border-t-lime-200'}
                                    ${edges.has(`${row},${col},right`) ? 'border-r-blue-600' : hoveredEdges.includes(`${row},${col},right`) ? 'border-r-blue-200' : 'border-r-lime-200'}
                                    ${edges.has(`${row},${col},bottom`) ? 'border-b-blue-600' : hoveredEdges.includes(`${row},${col},bottom`) ? 'border-b-blue-200' : 'border-b-lime-200'}
                                    ${edges.has(`${row},${col},left`) ? 'border-l-blue-600' : hoveredEdges.includes(`${row},${col},left`) ? 'border-l-blue-200' : 'border-l-lime-200'}`}
                                    >

                                    </div>

                                    {/* top */}
                                    <div className={`absolute top-0 left-0 w-full h-1 cursor-pointer`} onClick={(e) => handleEdgeClick(row, col, "top")} onMouseEnter={() => handleMouseEntered(row, col, "top")} onMouseLeave={handleMouseLeave}>
                                    </div>

                                    {/* right */}
                                    <div className={`absolute top-0 right-0 w-1 h-full cursor-pointer`} onClick={(e) => handleEdgeClick(row, col, "right")} onMouseEnter={() => handleMouseEntered(row, col, "right")} onMouseLeave={handleMouseLeave}></div>

                                    {/* left */}
                                    <div className={`absolute top-0 left-0 w-1 h-full cursor-pointer`} onClick={(e) => handleEdgeClick(row, col, "left")} onMouseEnter={() => handleMouseEntered(row, col, "left")} onMouseLeave={handleMouseLeave}>
                                    </div>

                                    {/* bottom */}
                                    <div className={`absolute bottom-0 left-0 h-1 w-full cursor-pointer`} onClick={(e) => handleEdgeClick(row, col, "bottom")} onMouseEnter={() => handleMouseEntered(row, col, "bottom")} onMouseLeave={handleMouseLeave}>
                                    </div>

                                </div>
                            )
                        })}
                    </div>

                ))
            }

        </section >
    </main>
}