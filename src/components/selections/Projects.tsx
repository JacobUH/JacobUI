import { useState } from "react";
import ImageDisplayer from "../widgets/imageDisplayer";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { changeProject } from "@/lib/features/projectSelectSlice";

export default function Projects () {
    const projectDesc = {
        coogify: ["Developed a music application with a highly responsive frontend and a robust backend, supporting various types of music content. Implemented authentication and access control to ensure secure login and role-based access for users, artists and admins. Optimized API endpoints and database queries to enhance performance of large music libraries and providing seamless playback experience and user content."],
        fuelfare: ["Created a fullstack application for estimating fuel quotes for clients associated with our company. Implemented authentication and access control as well as comprehensive testing, achieving 98% code coverage, and optimized database interactions for improved performance and security for clients."],
        ride: ["Built a car service mobile application that allowed users to rent exotic cars or look for nearby drivers in the area near the user coordinates. Implemented authentication and a secure login system to allows users to save user information and transactions and store them in the firebase console."],
        portfolio: ["Designed and developed a personal portfolio website showcasing a diverse range of current projects and endeavors. Employed HTML for frontend development, CSS/SCSS for styling, and JavaScript to develop custom functions."],
        guardians: ["Led my team, CoogSoft Games, as the producer and created a 3D Open world game called, A Guardian's Quest. This game utilizes C# within Unity to use objected-oriented models and a database to build the systems of our game. Models, Renders and Animations created in Blender."]
    }

    const projectArray = {
        coogify: ["coogify/coogifyPost.png", "/coogify/landingPage.png", "/coogify/signUp.png", "/coogify/dashboard.png", "/coogify/album.png", "/coogify/search.png", "/coogify/library.png", "/coogify/analytics.png", "/coogify/adminPortal.png"], 
        fuelfare: ["fuelfare/fuelfarePost.png", "/fuelfare/home.png", "/fuelfare/accessPortal.png", "/fuelfare/createAccount.png", "/fuelfare/dashboard.png", "/fuelfare/createQuote.png", "/fuelfare/viewQuote.png" , "/fuelfare/history.png", "/fuelfare/update.png"],
        ride: ["ride/ridePost.png", "/ride/landingPage.png", "/ride/login.png", "/ride/signUp.png", "/ride/home.png", "/ride/rides.png", "/ride/ridesInfo.png", "/ride/ridesCheckout.png", "/ride/ridesConfirmed.png", "/ride/rentals.png", "/ride/rentalsInfo.png", "/ride/rentalsPickup.png", "/ride/rentalsCheckout.png", "/ride/account.png", "/ride/accountProfile.png", "/ride/accountMessages.png", "/ride/accountWallet.png", "/ride/accountRewards.png", "/ride/accountSettings.png"],
        guardians: ["guardians/guardiansPost.png", "guardians/leon.png", "guardians/skeleton.png", "guardians/bones.png", "guardians/wizard.png", "guardians/quest.png", "guardians/boss.png", "guardians/world.png", "guardians/logo.png"],
        portfolio: ["portfolio/portfolioPost.png", "portfolio/projects.png", "portfolio/about.png"]

    };

    const dispatch = useDispatch();
    const currentProject = useSelector((state: RootState) => state.projectSelect.currentProject);
    const currentProjectDescArray = projectDesc[currentProject as keyof typeof projectDesc] || [];
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <div className="flex flex-col m-10 gap-4">
            <p className="text-6xl font-bold mb-8">Projects</p>
            <div className="bg-[#2e2e31] rounded-xl">
                <ImageDisplayer currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} imageArray={projectArray}/>
            </div>
            <div>
                <p className="text-2xl font-semibold">
                    Description
                </p>
                <p className="text-lg py-2">{currentProjectDescArray}</p>
            </div>
            
            <div>
                <p className="text-2xl text-center font-semibold">
                    More Projects
                </p>
                <div className="scrollable-div flex flex-row gap-16 overflow-x-scroll justify-center items-center py-10">
                    <button className="w-[20%]" onClick={() => {dispatch(changeProject('coogify')), setCurrentIndex(0)}}>
                        <img src="/coogify/coogifyPost.png" />
                    </button>
                    <button className="w-[20%]" onClick={() => {dispatch(changeProject('fuelfare')), setCurrentIndex(0)}}>
                        <img src="/fuelfare/fuelfarePost.png" />
                    </button>
                    <button className="w-[20%]" onClick={() => {dispatch(changeProject('ride')), setCurrentIndex(0)}}>
                        <img src="/ride/ridePost.png" />
                    </button>
                    <button className="w-[20%]" onClick={() => {dispatch(changeProject('guardians')), setCurrentIndex(0)}}>
                        <img src="/guardians/guardiansPost.png" />
                    </button>
                    <button className="w-[20%]" onClick={() => {dispatch(changeProject('portfolio')), setCurrentIndex(0)}}>
                        <img src="/portfolio/portfolioPost.png" />
                    </button>
                </div>
            </div>

        </div>
    );
}
