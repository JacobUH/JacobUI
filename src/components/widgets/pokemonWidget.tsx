import { changePage } from "@/lib/features/currentPageSlice"
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"

export default function PokemonWidget() {
    const dispatch = useDispatch();
    const [position, setPosition] = useState({paddingBottom: 0})

    useEffect(() => {
        const interval = setInterval(() => {
            setPosition((prevPosition) => {
                if (prevPosition.paddingBottom === 10 )
                    return { paddingBottom: 0 }
                else
                    return { paddingBottom: 10}
            })
        }, 1000);

        return() => clearInterval(interval);
    }, [1000]);


    return (
        <div className="flex flex-col gap-4 bg-[#2e2e31] h-96 text-center text-2xl font-black p-10 rounded-xl items-center justify-center relative">
            <p className="text-2xl">Pokemon</p>
            <button className="flex flex-row bg-[#29516B] items-center justify-center border-4 border-white mb-10" onClick={() => dispatch(changePage('pokemon'))}>
                <img className="w-64" src="pokemon/bulbasaur_display.webp" style={{top: `${position.paddingBottom}px`}}/>
                <img className="w-64" src="pokemon/charmander_display.webp" style={{top: `${position.paddingBottom}px`}}/>
                <img className="w-64" src="pokemon/squirtle_display.webp" style={{top: `${position.paddingBottom}px`}}/>
            </button>
            <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-base font-normal">Play Here</p>
            </div>
        </div>
    )
}
