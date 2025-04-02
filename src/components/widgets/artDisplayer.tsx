import { useState } from "react";
import { useDispatch } from "react-redux";
import { openModal } from "@/lib/features/projectModalSlice";

interface IndexProps {
    currentIndex: number;
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
    artArray: { [key: string]: string[] };
    currentCatergory: string;
}

export default function ArtDisplayer({ currentIndex, setCurrentIndex, artArray, currentCatergory }: IndexProps) {
    const dispatch = useDispatch();

    const currentArtArray = artArray[currentCatergory] ?? []; 

    const previousIndex = currentArtArray.length ? (currentIndex === 0 ? currentArtArray.length - 1 : currentIndex - 1) : 0;
    const nextIndex = currentArtArray.length ? (currentIndex === currentArtArray.length - 1 ? 0 : currentIndex + 1) : 0;

    const handlePrevious = () => {
        setCurrentIndex((curIndex) => (curIndex === 0 ? currentArtArray.length - 1 : curIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((curIndex) => (curIndex === currentArtArray.length - 1 ? 0 : curIndex + 1));
    };

    const handleOpen = (image: string) => {
        dispatch(openModal(image));
    };

    return (
        <div className="flex flex-col">
            <p className="text-4xl font-semibold">{currentCatergory.toLocaleUpperCase()}</p>
            <div className="flex flex-grow h-[38rem] justify-center items-center overflow-hidden py-10">
                <button className="flex h-[100%] w-[30%] p-4 items-center justify-center" onClick={handlePrevious}>
                    {currentArtArray.length > 0 && (
                        <img src={currentArtArray[previousIndex]} alt={`Art Image ${previousIndex + 1}`} style={{ maxHeight: "80%" }} />
                    )}
                </button>
                <button className="flex w-[40%] h-[100%] p-4 items-center justify-center" onClick={() => handleOpen(currentArtArray[currentIndex])}>
                    {currentArtArray.length > 0 && (
                        <img src={currentArtArray[currentIndex]} alt={`Art Image ${currentIndex + 1}`} style={{ maxHeight: "100%" }} />
                    )}
                </button>
                <button className="flex h-[100%] w-[30%] p-4 items-center justify-center" onClick={handleNext}>
                    {currentArtArray.length > 0 && (
                        <img src={currentArtArray[nextIndex]} alt={`Art Image ${nextIndex + 1}`} style={{ maxHeight: "80%" }} />
                    )}
                </button>
            </div>
            <div className="flex items-center justify-center gap-20 pb-10">
                <button onClick={handlePrevious}>
                    <img className="size-16" src="icons/leftIcon.svg" />
                </button>
                <p className="text-xl">{currentArtArray.length ? `${currentIndex + 1}/${currentArtArray.length}` : "No Images Available"}</p>
                <button onClick={handleNext}>
                    <img className="size-16" src="icons/RightIcon.svg" />
                </button>
            </div>
        </div>
    );
}

