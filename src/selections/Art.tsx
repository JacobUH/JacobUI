import { SetStateAction, useEffect, useState } from "react";
import "../../../resources/guesser.css"
import ArtDisplayer from "../widgets/artDisplayer";

export function TopicButton({label, color, handleClick}: any) {

    return (
        <button 
            className={`w-80 p-10 rounded-lg`}
            style={{ backgroundColor: color || "#5c5c63" }} 
            onClick={() => handleClick(label)}
        >
            {label}
        </button>
    )
}

export default function Art() {
    const [currentItem, setCurrentItem] = useState<string>('')
    const [triggerUpdate, setTriggerUpdate] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    const [currentIndex, setCurrentIndex] = useState(0);
    const [artArray, setArtArray] = useState<Record<string, string[]>>({});
    
    const apiKey = '57ef220e155bfdd5ae7e020d45585cf65dea6ec8613798d61fe9cc1ac419eee2'; // Replace with your SerpAPI key
    const newApiKey = 'f8-mlszl6N9EgYezSdPamAtbTGEZKgfq7aBdDHi5v4U' // Replace with your Unsplash key

    const topics = [
        { key: "Nature", label: "Nature", color: "#5d5d61" },
        { key: "City", label: "Cities", color: "#7e7e80" },
        { key: "Abstract", label: "Abstract",color: "#b6bbb7" },
        { key: "Castle", label: "Castles", color: "#3e3e41" },
        { key: "Sports", label: "Sports", color: "#a0a0a1" },
        { key: "Art", label: "Art", color: "#55555a" },
        { key: "Space", label: "Space", color: "#55555a" },
        { key: "Technology", label: "Technology", color: "#858586" },
        { key: "History & Ancient Civilizations", label: "History", color: "#aaaaaa" },
        { key: "Music", label: "Music", color: "#333333" },
        { key: "Films", label: "Films", color: "#5d5d5e" },
        { key: "Modern Houses", label: "Modern Houses", color: "#918d8d" },
        { key: "Food", label: "Food & Culinary", color: "#b6bbb7" },
        { key: "Wildlife", label: "Wildlife", color: "#353536" },
        { key: "Vintage", label: "Vintage", color: "#333333" },
        { key: "Architecture Marvels", label: "Architecture", color: "#918d8d" },
        { key: "Photography", label: "Photography", color: "#a1a1aa" },
        { key: "Fashion", label: "Fashion", color: "#49494e" },
        { key: "Future", label: "Future", color: "#5d5d5e" },
        { key: "Superheros", label: "Superheros", color: "#5d5d5e" },
    ];

      
    useEffect(() => {
        async function fetchResults() {
            if (currentItem == ''){
                return;
            }

            const newUrl = `https://api.unsplash.com/search/photos?query=${currentItem}&per_page=${'20'}&client_id=${newApiKey}`
            try {   
                const response = await fetch(newUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data);

                // Convert API response into projectArray format
                const formattedData = data.results.reduce((acc: { [x: string]: any[]; }, item: { urls: { regular: any; }; }) => {
                    const category = currentItem.toLowerCase(); // Use query as category key
                    if (!acc[category]) acc[category] = []; // Ensure category exists

                    acc[category].push(item.urls.regular); // Store image URLs
                    return acc;
                }, {} as Record<string, string[]>);
    
                setArtArray(formattedData); // Save formatted data
                console.log("content", formattedData);

            } catch (error) {
                setErrorMessage('Error fetching data. Please try again later.')
            }
        }
        fetchResults();
    }, [triggerUpdate, currentItem]);

    const handleClick = (label: SetStateAction<string>) => {
        setCurrentItem((prev) => (typeof label === "string" ? label.toLowerCase() : prev));
        setTriggerUpdate((prev) => !prev); // Trigger update to refetch results
    };
    
    
    return (
        <div className="flex flex-col m-10 gap-4">
            <div className="text-6xl font-bold mb-8">
                <p className="text-6xl font-bold mb-8">Art Gallery</p>
                { currentItem ?
                    <div className="flex flex-col w-full min-h-[70vh] bg-[#2e2e31] bg-[url('/artGalleryBackground.jpg')] items-center text-center text-xl p-10 pt-16 rounded-xl relative">
                        <ArtDisplayer currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} artArray={artArray} currentCatergory={currentItem}/>
                        <button className="bg-[#8f8f8f] p-3 rounded-lg hover:bg-[#a3a3a3]" onClick={() => setCurrentItem('')}>
                            Back to Gallery
                        </button>
                    </div>
                    :
                    <div className="flex flex-col w-full min-h-[70vh] bg-[#2e2e31] bg-[url('/artWaitingRoom.jpg')] bg-scroll items-center text-center text-xl p-10 pt-16 rounded-xl relative">
                        <p className="text-6xl">Welcome</p>
                        <p className="text-2xl">Select one of our exhibitions</p>
                        <div className="grid grid-cols-4 grid-rows-4 gap-6 py-10">
                            {topics.map((currentTopic) => (
                                <TopicButton key ={currentTopic.key} label={currentTopic.label} color={currentTopic.color} handleClick={handleClick} />
                            ))}
                        </div>
                    </div> 
                }
            </div>
        </div>
 
    )
}
