import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { openModal } from "@/lib/features/projectModalSlice";

interface IndexProps {
    currentIndex: number;
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
    imageArray: { [key: string]: string[] }
}

export default function ImageDisplayer({ currentIndex, setCurrentIndex, imageArray }: IndexProps) {
    

    const currentProject = useSelector((state: RootState) => state.projectSelect.currentProject);
    const currentProjectArray = imageArray[currentProject as keyof typeof imageArray] || [];
    //console.log(currentProjectArray);

    const dispatch = useDispatch();
    const previousIndex = currentIndex === 0 ? currentProjectArray.length - 1 : currentIndex - 1;
    const nextIndex = currentIndex === currentProjectArray.length - 1 ? 0 : currentIndex + 1;

    const handlePrevious = () => {
        setCurrentIndex((curIndex) => (curIndex === 0 ? currentProjectArray.length - 1: curIndex - 1))
    }

    const handleNext = () => {
        setCurrentIndex((curIndex) => (curIndex === currentProjectArray.length - 1 ? 0 : curIndex + 1));
    }

    const handleOpen = (image: string) => {
        dispatch(openModal(image));
    };

    return (
        <div className="flex flex-col">
            <div className="flex flex-grow h-[38rem] justify-center items-center overflow-hidden py-10">
                <button className="flex h-[100%] w-[30%] p-4 items-center justify-center" onClick={handlePrevious}>
                    <img src={currentProjectArray[previousIndex]} alt={`Project Image ${previousIndex + 1}`} style={{ maxHeight: '80%' }} />
                </button>
                <button className="flex w-[40%] h-[100%] p-4 items-center justify-center" onClick={() => handleOpen(currentProjectArray[currentIndex])}>
                    <img src={currentProjectArray[currentIndex]} alt={`Project Image ${currentIndex + 1}`} style={{ maxHeight: '100%' }}/> 
                </button>
                <button className="flex h-[100%] w-[30%] p-4 items-center justify-center" onClick={handleNext}>
                    <img  src={currentProjectArray[nextIndex]} alt={`Project Image ${nextIndex + 1}`} style={{ maxHeight: '80%' }}/>
                </button>
            </div>
            <div className="flex items-center justify-center gap-20 pb-10">
                <button onClick={handlePrevious}>
                    <img className="size-16" src="icons/leftIcon.svg"/>
                </button>
                <p className="text-xl">{currentIndex+1 + "/" + currentProjectArray.length}</p>
                <button onClick={handleNext}>
                    <img className="size-16" src="icons/RightIcon.svg"/>
                </button>
            </div>
        </div>
        
    );
}
