'use client'
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { closeModal } from "@/lib/features/projectModalSlice";

import Image from "next/image";
import SidebarItem from "@/components/elements/sidebarItem";
import MainContent from "@/components/elements/mainContent";
import { changePage } from "@/lib/features/currentPageSlice";

export default function Home() {

  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.projectModal.isOpen);

  const currentImage = useSelector((state: RootState) => state.projectModal.currentImage);

  const handleClose = () => {
    dispatch(closeModal());
  };
  
  return (
    <div className="flex flex-col min-h-screen sm:p-16 sm:pb-0 font-[family-name:var(--font-geist-sans)]">
      <main className="flex gap-8 flex-grow">
        <div className="flex flex-col items-center gap-8">

          {/* Top Left */}
          <div className="flex flex-col gap-5 bg-[#1C1C1E] w-[25vh] min-h-60 rounded-xl justify-center items-center hover:w-[25vh] hover:shadow-lg hover:shadow-[#8a8a8a] transition-all duration-300 ease-in-out">
            <img
              className="w-[70%] rounded-full border-4 border-[#e9e9e9]"
              src="/Jacob_Rangel.jpg"
              alt="Top left image"
            />
            <div className="text-center">
              <div className="text-white text-xl">Jacob Rangel</div>
              <div className="text-white text-sm">UIDEV</div>
            </div>
          </div>

          {/* Bottom left */}
          <div className="bg-[#1C1C1E] w-[25vh] rounded-xl flex-grow hover:w-[25vh] hover:shadow-lg hover:shadow-[#8a8a8a] transition-all duration-300 ease-in-out py-5">
            <div className="h-full flex flex-col justify-between">
              <SidebarItem name="Overview" icon="icons/home.svg" onClick={() => dispatch(changePage('overview'))} />
              <SidebarItem name="Projects" icon="icons/projects.svg" onClick={() => dispatch(changePage('projects'))}/>
              <SidebarItem name="Daily Music" icon="icons/music.svg" onClick={() => dispatch(changePage('music'))}/>
              <SidebarItem name="Art Gallery" icon="icons/art.svg" onClick={() => dispatch(changePage('artGallery'))}/>
              <SidebarItem name="Weather" icon="icons/cloud.svg" onClick={() => dispatch(changePage('weather'))}/>
              <SidebarItem name="Pokemon" icon="icons/pokeballIcon.svg" onClick={() => dispatch(changePage('pokemon'))}/>
              <SidebarItem name="Wordle" icon="icons/wordle.svg" onClick={() => dispatch(changePage('wordle'))}/>
              <SidebarItem name="Guesser" icon="icons/world_guesser.svg" onClick={() => dispatch(changePage('guesser'))}/>
              <SidebarItem name="Avalon" icon="icons/avalon.svg" onClick={() => dispatch(changePage('avalon'))}/>
            </div>
          </div>
        </div>

        {/* right side */}
        <div className="scrollable-div flex flex-col gap-5 bg-[#1C1C1E] w-[100%] md:h-[calc(100vh-140px)] rounded-xl hover:w-[100%] hover:shadow-lg hover:shadow-[#8a8a8a] transition-all duration-300 ease-in-out overflow-y-scroll">
          <MainContent />
        </div>
      </main>
      <footer className="flex gap-6 flex-wrap items-center justify-center sm:p-10">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/JacobUH"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="icons/home.svg"
            alt="Home icon"
            width={16}
            height={16}
          />
          Personal Github
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://gitlab.paycomhq.com/users/jacob.rangel"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="icons/dev.svg"
            alt="Dev icon"
            width={16}
            height={16}
          />
          Paycom Gitlab
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://jacobuh.github.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="icons/world.svg"
            alt="World icon"
            width={16}
            height={16}
          />
          Check out my website here →
        </a>
      </footer>

      {/* Modal Here */}
      {isOpen && (
        <div className="absolute w-full h-full bg-black bg-opacity-90 z-10 flex items-center justify-center p-10">
            <div className="flex flex-col items-center gap-10 max-w-full max-h-full">
                <img className="w-full h-full max-w-[70%] max-h-[90%] object-contain mb-4" src={currentImage} />
                <button className="text-2xl" onClick={handleClose}>Click Here to Return</button>
            </div>
        </div>
    )}
  
    </div>
  );
}
