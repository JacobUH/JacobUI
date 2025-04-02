import React from "react";

export default function SidebarItem({name, icon, onClick}: any) {
    return (
        <div>
        {(name != "Wordle") ? (
            <div className="flex gap-4 items-center justify-center hover:mx-1 hover:bg-[#2e2e31] p-5 cursor-pointer" onClick={onClick}>
                <img className="w-[3vh]" style={{ filter: 'grayscale(1)' }} src={icon ? icon : "icons/question.svg"}/>
                <div className="text-xl">{name}</div>
            </div>
        ): (
            <div className="flex gap-4 items-center justify-center hover:mx-1 hover:bg-[#2e2e31] p-5 cursor-pointer" onClick={onClick}>
                <img className="w-[2vh]" style={{ filter: 'invert(1) grayscale(1)' }} src={icon ? icon : "icons/question.svg"}/>
                <div className="text-xl">{name}</div>
            </div>
        )}
        </div>
    );
}
