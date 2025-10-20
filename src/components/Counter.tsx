'use client'
import { useState } from "react"

function Counter() {
    const [count, setCount] = useState<number>(0)

    const handleIncrease = () => {
        setCount(count + 1)
    }

    const handleDecrease = () => {
        if (count > 0) {
            setCount(count - 1)
        }
    }

    return (
        <div className="flex items-center justify-center h-screen w-screen">
            <div className="flex flex-col items-center justify-center border-4 rounded-2xl border-white/65  px-6 w-1/5 h-3/5">
                <h2 className="mb-14">Counter</h2>
                <div className="w-50% h-10rem mb-14 text-7xl">{count}</div>
                <div className="flex justify-between gap-10">
                    <button
                        className="flex items-center justify-center pb-3 px-7 text-6xl bg-red-500 rounded"
                        onClick={handleDecrease}
                    >
                        -
                    </button>
                    <button
                        className="flex items-center justify-center pb-2 px-6 text-5xl bg-blue-500 rounded"
                        onClick={handleIncrease}
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Counter