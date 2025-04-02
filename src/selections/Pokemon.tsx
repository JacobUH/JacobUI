import { useState, useEffect } from "react";
import PokemonBox from "../elements/pokemonBox";
import { changePage } from "@/lib/features/currentPageSlice";
import { useDispatch } from "react-redux";
import "../../../resources/pokemon.css"
export default function Pokemon() {
    const dispatch = useDispatch()
    const [position, setPosition] = useState({paddingBottom: 0})

    const [modalSelection, setModalSelection] = useState('')
    const [openModal, setOpenModal] = useState(false)

    const [currentPokemon, setCurrentPokemon] = useState('charmander')
    const [currentHealth, setCurrentHealth] = useState('low')

    const [hideMonke, setHideMonke] = useState(false)
    const [monkeHealth, setMonkeHealth] = useState('high')
    const [catchPokemon, setCatchPokemon] = useState(false)
    const [showPokedex, setShowPokedex] = useState(false)


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

    useEffect(() => {
        let timer: string | number | NodeJS.Timeout | undefined;
        if (catchPokemon){
            timer = setTimeout(() => { setHideMonke(true);
                setTimeout(() => {
                    setShowPokedex(true),
                    setOpenModal(true);
                }, 2000);
            }, 1500);
                    } else {
            setHideMonke(false);
        } return () => clearTimeout(timer);

    }, [catchPokemon])
    

    return (
        <div className="flex min-h-screen flex-col m-10 gap-6">
            <p className="text-6xl font-bold mb-8">Pokemon</p>
            <div className="flex flex-col w-[full] bg-[#2e2e31] items-center text-center p-10 rounded-xl relative">
                <div className="flex bg-[url('/background.png')] w-[60%] min-h-[35rem] bg-cover bg-white bg-no-repeat relative overflow-hidden">
                    { !hideMonke && (
                        <img className="absolute w-[25%] right-[15%] pt-[5%]" src="/pokemon/monkey.png" style={{top: `${position.paddingBottom}px`}}/>
                    )}
                    <PokemonBox 
                        name="monke"
                        level="100"
                        health={monkeHealth}
                        top="4rem"
                        left="4rem"/>
                    <img className="absolute w-[75%] right-[35%]" src={`/pokemon/${currentPokemon}.webp`} style={{top: `${position.paddingBottom}px`}}/>
                    <PokemonBox
                        name={currentPokemon}
                        level="7"
                        health={currentHealth}
                        bottom ="1rem"
                        right="1rem"/>
                    {catchPokemon && !showPokedex && (
                        <img 
                            className="absolute w-24" src="pokemon/pokeballSprite.png" 
                            style={{ 
                                    animation: 'movePokeball 1.5s linear, catchPokemon 2s linear 1.5s', 
                                    bottom: 0, 
                                    left: 0
                            }} 
                        />
                    )}
                </div>
                
                <div className="flex flex-row w-[60%]">
                    <div className=" basis-4/6 bg-[#29516B] border-8 border-[#293031] p-4">
                        <p className="w-full h-full text-white text-start text-4xl">{`What will`}<br />{currentPokemon.toUpperCase()} do?</p>
                    </div>
                    <div className=" bg-[url('/textbox.png')] bg-contain bg-no-repeat bg-white bottom-0">
                        <div className="w-full h-full grid grid-rows-2 grid-cols-2 p-8 text-black text-4xl font-bold place-items-center">
                            <button onClick={() => {setMonkeHealth('crit')}}>FIGHT</button>
                            <button onClick={() => {setOpenModal(true), setModalSelection('bag')}}>BAG</button>
                            <button onClick={() => {setOpenModal(true), setModalSelection('pokemon')}}>POKEMON</button>
                            <button onClick={() => dispatch(changePage('overview'))}>RUN</button>
                        </div>
                    </div>
                </div>
                { openModal && (
                    <div className="absolute flex flex-col w-[60%] min-h-[45rem] bg-black bg-opacity-90 z-10 items-center justify-center">
                        <div className="flex flex-col gap-6">
                            {modalSelection == 'pokemon' && (
                                <div className="bg-[#29516B] p-5">
                                    <button onClick={() => {setCurrentPokemon('bulbasaur'), setOpenModal(false)}}>
                                        <img src="pokemon/bulbasaur_display.webp"/>
                                    </button>
                                    <button onClick={() => {setCurrentPokemon('charmander'), setOpenModal(false)}}>
                                        <img src="pokemon/charmander_display.webp"/>
                                    </button>
                                    <button onClick={() => {setCurrentPokemon('squirtle'), setOpenModal(false)}}>
                                        <img src="pokemon/squirtle_display.webp"/>
                                    </button>
                                </div>
                                
                            )}
                            {modalSelection == 'bag' && (
                                <div className="flex space-x-4 bg-[#29516B] p-5">
                                    <button onClick={() => {setCurrentHealth('high'), setOpenModal(false)}}>
                                        <img className="w-48 h-48 object-contain" src="pokemon/potion.webp" alt="Potion" />
                                    </button>
                                    <button onClick={() => {setCatchPokemon(true), setOpenModal(false), setModalSelection('pokedex')}}>
                                        <img className="w-48 h-48 object-contain" src="pokemon/pokeballSprite.png" alt="Pokeball" />
                                    </button>
                                </div>
                            )}
                            {modalSelection == 'pokedex' && showPokedex && (
                                <div className="w-[700px] relative">
                                        <img className="w-[700px]" src="/pokedex.png" />
                                        <p className="absolute text-3xl font-semibold top-[7rem] right-64 text-gray-600">MONKE</p>
                                        <img className="absolute top-28 left-12 w-[30%]" src="/pokemon/monkey_caught.png" />
                                </div>
                            )}
                            <button className="text-3xl" onClick={() => setOpenModal(false)}>Cancel</button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};
