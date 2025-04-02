import { SetStateAction, useEffect, useState } from "react";
import { ApiResponse, LocalResult, Results } from "../../../resources/interface";
import "../../../resources/guesser.css"

export function TopicButton({label, color, handleClick}: any) {

    return (
        <button 
            className={`w-80 p-4 rounded-lg`}
            style={{ backgroundColor: color || "#5c5c63" }} 
            onClick={() => handleClick(label)}
        >
            {label}
        </button>
    )
}

export default function Guesser() {
    const [currentItem, setCurrentItem] = useState<string>('nothing')
    const [triggerUpdate, setTriggerUpdate] = useState(false);
    const [currentLocation, setCurrentLocation] = useState('Texas')
    const [apiResponse, setApiRepsonse] = useState<ApiResponse | null>(null)
    const [errorMessage, setErrorMessage] = useState('')
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userGuess, setUserGuess] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [size, setSize] = useState(0);
    
    const apiKey = '57ef220e155bfdd5ae7e020d45585cf65dea6ec8613798d61fe9cc1ac419eee2'; // Replace with your SerpAPI key
    const newApiKey = 'f8-mlszl6N9EgYezSdPamAtbTGEZKgfq7aBdDHi5v4U' // Replace with your Unsplash key

    const topics = [
        { key: "Food", label: "Food", color: "#5f5fc7" },
        { key: "Stores", label: "Brands", color: "#5fc764" },
        { key: "Banks", label: "Banks",color: "#b6bbb7" },
        { key: "Gas Stations", label: "Gas Stations", color: "#c78e5f" },
        { key: "NBA", label: "NBA Teams", color: "#8f5fc7" },
        { key: "Template", label: "Fruit", color: "#c75f5f" }
      ];
      
    const navigate = 

    useEffect(() => {
        async function fetchResults() {
            if (currentItem == 'nothing'){
                return;
            }

            const url = `https://cors-anywhere.herokuapp.com/https://serpapi.com/search.json?engine=google_local&q=${currentItem}&location=${currentLocation}&api_key=${apiKey}`;
            const newUrl = `https://api.unsplash.com/search/photos?query=${currentItem}&per_page=${'20'}&client_id=${newApiKey}`
            try {   
                const response = await fetch(newUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data);
                setApiRepsonse(data);               
            } catch (error) {
                setErrorMessage('Error fetching data. Please try again later.')
            }
        }
        fetchResults();
    }, [triggerUpdate, currentItem]);

    const handleClick = (label: SetStateAction<string>) => {
        setCurrentItem(label);
        setTriggerUpdate(prev => !prev); // Trigger update to refetch results
            console.log("currentIndex: ", currentIndex, '\n', "maxSize: ", size)
    };

    const handleGuess = () => {
        if (apiResponse && apiResponse.results[currentIndex].description && apiResponse.results[currentIndex].description.includes(userGuess) || apiResponse && apiResponse.results[currentIndex].alt_description && apiResponse.results[currentIndex].alt_description.includes(userGuess)) {
            setCurrentIndex(currentIndex + 1);
            setErrorMessage('')
            setUserGuess('')
        } else {
            setErrorMessage(`Incorrect Guess! It was ${apiResponse && apiResponse.results[currentIndex].description}`)
        }
    }
    

    return (
        <div className="flex flex-col m-10 gap-4">
            <div className="text-6xl font-bold mb-8">
                <p className="text-6xl font-bold mb-8">AnyGuesser</p>
                <div className="flex flex-col w-full bg-[#2e2e31] items-center text-center text-xl p-10 rounded-xl relative">
                {apiResponse ? (
                    <>
                        {currentIndex < apiResponse.results.length ? (
                            <div>
                                <p className="text-4xl mb-5">Current Guess {currentIndex + 1}/{apiResponse.results.length}</p>
                                <img src={apiResponse.results[currentIndex].urls.full} alt="Guess the place" className="w-[36rem] h-[36rem] mx-auto mb-4" />
                                <div className="flex gap-6 justify-center items-center">
                                    <input
                                        className="p-2 border rounded-lg text-black"
                                        type="text"
                                        value={userGuess}
                                        onChange={(e) => setUserGuess(e.target.value)}
                                        placeholder="Enter your guess"
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                handleGuess();
                                            }
                                        }}
                                    />
                                    <button onClick={handleGuess} className="bg-[#5c5c63] p-4 rounded-lg">
                                        Submit Guess
                                    </button>
                                </div>
                                {errorMessage && currentItem && <p className="text-red-500 mt-6">{errorMessage}</p>}
                                {/* {feedbackMessage && <p className="mt-4">{feedbackMessage}</p>} */}
                            </div>
                        ) : (
                            <p>You've reached the end of the game!</p>
                        )}
                    </>
                ) : (
                    <div className="">
                        <p className="text-5xl">Choose A Topic to Guess!</p>
                        <div className="grid grid-cols-4 grid-rows-4 gap-6 py-10">
                            {topics.map((currentTopic) => (
                                <TopicButton key ={currentTopic.key} label={currentTopic.label} color={currentTopic.color} handleClick={handleClick} />
                            ))}
                            
                        </div>
                    </div>
                )}
                </div>
                <div className="flex text-xl justify-center items-center gap-2 mt-10">
                    Enable This:
                    <p className="text-2xl bg-gradient-to-r from-blue-600 via-green-500 to-violet-400 inline-block text-transparent bg-clip-text cursor-pointer" onClick={() => window.open("https://cors-anywhere.herokuapp.com/corsdemo")}>
                    https://cors-anywhere.herokuapp.com/corsdemo
                    </p>
                </div>
                
                <div className="flex text-xl justify-center items-center mt-10">
                    <p className="bg-[#2e2e31] text-[#5a5a5f] p-3 rounded-md border-2 border-orange-500">IN DEVELOPMENT</p>
                </div>
            </div>
        </div>
 
    )
}
