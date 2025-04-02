import { useState } from "react";

interface boxProps {
    name: string
    level: string
    health?: string
    top?: string
    bottom?: string
    left?: string
    right?: string
}
export default function PokemonBox({name, level, health, top, bottom, left, right}: boxProps) { 
    
    const getHealthColor = (health: string) => {
        if (health == "high") return "#18C321";
        if (health == "low") return "#DAAE24";
        if (health == "crit") return "#F5432F";
    };

    const getLifepool = (health: string) => {
        if (health == "full") return "100%";
        if (health == "high") return "90%";
        if (health == "low") return "40%";
        if (health == "crit") return "10%";
        return "0%";
    };

    return (
        <div className="absolute flex py-1 px-2 bg-[#ADAA94] border-8 border-[#293029]"
        style={{ top, left, bottom, right }}>
            <div className="flex flex-col px-6 py-3 bg-[#6B715A]">
                <div className="flex flex-row items-center">
                    <p className="w-full h-full text-white text-start text-4xl mr-8 uppercase">{name}</p>
                    <p className="w-full h-full text-white text-start text-4xl ml-8">Lv{level}</p>
                </div>
                <div className="flex flex-row space-x-10">
                    <img className="w-[10%] h-[80%]" src="/pokemon/pokeball.png" />
                    <div className="w-[80%] h-full bg-[#293029] rounded-md">
                        <div className="flex">
                            <p className="text-lg font-extrabold ml-1">HP</p>
                            <div className="relative w-full m-1 bg-[#293029] border-4 border-white rounded-md">
                                
                                <div
                                    className="absolute h-full rounded-sm"
                                    style={{
                                        width: health ? getLifepool(health): "0%",
                                        backgroundColor: health ? getHealthColor(health): "",
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
