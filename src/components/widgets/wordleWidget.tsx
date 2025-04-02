import { useState } from "react"
import { ModeButton } from "../selections/Wordle";


export default function WordleWidget() {
    // Sample data for illustration
    const [currentMode, setCurrentMode] = useState('med');

    const [stats, setStats] = useState({
      gamesPlayed: 42,
      winRate: 75,
      currentStreak: 5,
      longestStreak: 10
    });
  
    return (
      <div className="bg-[#2e2e31] h-96 text-center text-2xl font-black p-10 rounded-xl relative">
        <p className="text-2xl">Wordle</p>
        <div className="flex gap-24 items-center justify-center h-[90%]">
            <img className="w-24 bg-white rounded-xl" src="icons/wordle.svg" />
            <div className="flex font-normal items-center justify-center">
                <div className="flex flex-col w-full gap-6 items-center">
                    {/* Current Wordle Puzzle */}
                    <p className="text-lg">Play Today's Wordle:</p>
                    <div className="flex gap-5">
                        <ModeButton color="#44c74f" setCurrentMode={setCurrentMode} mode="med" label="Medium" />
                    </div>
                </div>
                    
            </div>
            <div className="p-">
                <div className="text-base font-normal">
                    {/* Wordle Statistics */}
                    <p>Games Played: {stats.gamesPlayed}</p>
                    <p>Win Rate: {stats.winRate}%</p>
                    <p>Current Streak: {stats.currentStreak}</p>
                    <p>Longest Streak: {stats.longestStreak}</p>
                </div>
            </div>
        </div>
      </div>
    );
  }
