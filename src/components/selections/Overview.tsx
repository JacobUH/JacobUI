import {WeatherData} from "../../../resources/interface";
import CurrentWeather from "../widgets/weatherWidgets";
import ProjectsWidget from "../widgets/projectsWidget";
import PokemonWidget from "../widgets/pokemonWidget";
import Template from "../widgets/template";
import { useDispatch } from "react-redux";
import { openModal } from "@/lib/features/projectModalSlice";
import WordleWidget from "../widgets/wordleWidget";

interface OverviewProps {
    weatherData: WeatherData | null;
  }

export default function Overview() {
    const dispatch = useDispatch();

    return (
        <div className="flex flex-col m-10">
            <div className="text-6xl font-bold mb-8">
                Overview
            </div>
            <div className="grid grid-cols-2 grid-rows-2 gap-4 py-10">
                <ProjectsWidget />
                <CurrentWeather />
                <PokemonWidget />
                <WordleWidget />
            </div>
            <div className="flex py-10">
                <img
                    className="w-[20%] mr-5 cursor-pointer"
                    onClick={() => dispatch(openModal('me_2.jfif'))}
                    src="/me_2.jfif"
                    alt="Top left image"
                />
                <div className="flex flex-col gap-4">
                    <div className="text-wrap text-xl">
                        Hello there! My name is Jacob Rangel, and I am a Software Developer at Paycom with a passion for coding and technology. 
                        My love for coding started in high school, where I was a member of the Technology Student Association (TSA), a coding and engineering club around the nation. 
                        It was through this club that my interest was peaked from coding and its endless possibilities for creation. 
                        I have since continued to pursue this interest through my career and personal coding projects during my free time.
                    </div>
                    <div className="text-wrap text-xl">
                        I was also a student at the University of Houston, graduating in the fall of 2024 with degrees in Computer Science and Mathematics. During my time there, I honed
                        many of my skills and built lasting relationships with some of my closest peers through excellent clubs like CougarCS and CSGirls. I'm grateful for the success
                        I've achieved and look forward to making a significant impact in the tech industry.
                    </div>
                </div>
            </div>

            <div className="flex py-5">
                <div className="flex flex-col gap-4">
                    <div className="text-wrap text-xl">
                        During the summer as a Software Developer Intern, I worked on the Client Active Products and Usage API Team. Alongside myself, my teammates consisted of Giri
                        Yogendra, Benson Hsu and Wei Li. We developed an intuitive interface for interacting with enablements of products and features for clients.
                    </div>
                    <div className="text-wrap text-xl">
                        Our goal was to make the system user-friendly, as the current setup in AdminV2 was convoluted and difficult to navigate. We also proposed a future feature that
                        would enable internal users to configure products directly within the interface, eliminating the need for backend and database modifications. Ultimately, we
                        gained valuable insights into the workings of a corporate development environment and brought back industry-standard coding practices to school, setting us apart
                        from our peers. 
                    </div>
                </div>
                <img
                    className="w-[30%] ml-10 cursor-pointer"
                    onClick={() => dispatch(openModal('/paycom.jfif'))}
                    src="/paycom.jfif"
                    alt="Top left image"
                />
                <img
                    className="w-[30%] ml-10 cursor-pointer"
                    onClick={() => dispatch(openModal('paycom_team.jfif'))}
                    src="/paycom_team.jfif"
                    alt="Top left image"
                />
            </div>

        </div>
    );
};

