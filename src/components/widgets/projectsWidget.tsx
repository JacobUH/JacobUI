import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeProject } from "@/lib/features/projectSelectSlice";
import { changePage } from "@/lib/features/currentPageSlice";

export default function ProjectsWidget() {
    const allProjects = [
        { name: "coogify", path: "/coogify/coogifyPost.png" },
        { name: "fuelfare", path: "/fuelfare/fuelfarePost.png" },
        { name: "ride", path: "/ride/ridePost.png" },
        { name: "guardians", path: "/guardians/guardiansPost.png" },
        { name: "portfolio", path: "/portfolio/portfolioPost.png" },
    ];
        
    const dispatch = useDispatch();
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const previousIndex = currentIndex === 0 ? allProjects.length - 1 : currentIndex - 1;
    const nextIndex = currentIndex === allProjects.length - 1 ? 0 : currentIndex + 1;

    const handlePrevious = () => {
        setCurrentIndex((curIndex) => (curIndex === 0 ? allProjects.length - 1: curIndex - 1))
    }

    const handleNext = () => {
        setCurrentIndex((curIndex) => (curIndex === allProjects.length - 1 ? 0 : curIndex + 1));
    }

    return (
        <div className="bg-[#2e2e31] h-96 text-center text-2xl font-black p-10 rounded-xl relative">
            <p className="text-2xl">Projects</p>
            <div className="flex font-normal items-center justify-center h-[90%]">
                <button className="flex h-[100%] w-[30%] p-4 items-center justify-center" onClick={handlePrevious}>
                <img src={allProjects[previousIndex].path} alt={`Project Image ${previousIndex + 1}`} style={{ maxHeight: '80%' }} />
                </button>
                <button className="flex w-[40%] h-[100%] p-4 items-center justify-center" onClick={() => {dispatch(changePage('projects')), dispatch(changeProject(allProjects[currentIndex].name))}}>
                <img src={allProjects[currentIndex].path} alt={`Project Image ${currentIndex + 1}`} style={{ maxHeight: '100%' }} /> 
                </button>
                <button className="flex h-[100%] w-[30%] p-4 items-center justify-center" onClick={handleNext}>
                <img src={allProjects[nextIndex].path} alt={`Project Image ${nextIndex + 1}`} style={{ maxHeight: '80%' }} />
                </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-base font-normal">Click Project to View</p>
            </div>
        </div>

    )
}
