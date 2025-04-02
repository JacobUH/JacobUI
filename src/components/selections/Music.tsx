import { openModal } from "@/lib/features/projectModalSlice";
import { useDispatch } from "react-redux";

const dailyMusicArray = [
    {date: "Febuary 21, 2025", song: "LV Bag", artists: "Don Toliver (feat j.hope & Pharrell Williams)", coverArt: "/music/lvBag.jfif", releaseDate: "February 2025", color: "#fcc6de"},
    {date: "March 11, 2025", song: "Shangri-La", artists: "Hydraa, glum", coverArt: "/music/grooveRush.jfif", releaseDate: "September 2024"},
    {date: "March 14, 2025", song: "EVIL J0RDAN", artists: "Playboi Carti", coverArt: "/music/iAmMusic.png", releaseDate: "March 2025"},
    {date: "March 20, 2025", song: "Objects in The Mirror", artists: "Mac Miller", coverArt: "/music/objectsMirror.jfif", releaseDate: "June 2013", color: "#d42329"},
    {date: "March 21, 2025", song: "Latch", artists: "Disclosure, Sam Smith", coverArt: "/music/latch.jfif", releaseDate: "June 2013"},
    {date: "March 24, 2025", song: "Simple & Clean", artists: "imprintafter", coverArt: "/music/simpleAndClean.jfif", releaseDate: "June 2023"},
    {date: "March 25, 2025", song: "Dreamer", artists: "Throttle", coverArt: "/music/whereUAre.jfif", releaseDate: "October 2019", color: "#c6f300"},
    {date: "March 26, 2025", song: "luv sensation", artists: "AshZone", coverArt: "/music/luvSensation.jfif", releaseDate: "December 2024", color: "#602894"},
    {date: "March 27, 2925", song: "Candy", artists: "Don Toliver", coverArt: "/music/heavenHell.jfif", releaseDate: "March 2020"},
    {date: "March 28, 2025", song: "Snap My Finger", artists: "Kaytranada (feat. PinkPantherss)", coverArt: "/music/timeless.jfif", releaseDate: "June 2024"},
    {date: "March 31, 2025", song: "Gravity", artists: "Ferdous", coverArt: "/music/gravity.jfif", releaseDate: "January 2021"},
    {date: "April 1, 2025", song: "LiGhT rAiLs*ੈ✩‧₊˚", artists: "1999 WRITE THE FUTURE, Rick Ross, Rich Brian", coverArt: "/music/hella.jfif", releaseDate: "February 2024"},
    {date: "April 2, 2025", song: "Wat U Sed", artists: "Isaiah Rashad (feat. Doechii & Kal Banx)", coverArt: "/music/houseBurning.jfif", releaseDate: "July 2021"},
]
// {date: "", song: "", artists: "", coverArt: "/music/", releaseDate: ""},



interface indexProps {
    date: string,
    song: string,
    artists: string,
    coverArt: string
    releaseDate: string
    color?: string
}

export function MusicRow ({date, song, artists, coverArt, releaseDate, color}: indexProps) {
    const dispatch = useDispatch();

    const handleOpen = (image: string) => {
        dispatch(openModal(image));
    };

    return (
        <div className="flex flex-col min-w-full p-5 text-xl text-start">
            <hr className="bg"/>
            <p className="text-2xl pt-4 pb-2">{date}</p>
            <button className="flex flex-row items-center" onClick={() => handleOpen(coverArt)}>
                <img className="w-32" src={coverArt} alt="image of song"/>
                <div className="flex flex-col text-start ml-5">
                    <p className={`text-4xl text-[${color}] mb-3`}>{song}</p>
                    <p className="text-xl">{artists}</p>
                    <p className="text-base">{releaseDate}</p>
                </div>
            </button>
        </div>
    )
}

export default function Music () {
    return(
        <div className="flex flex-col m-10 gap-4 relative">
            <div className="text-6xl font-bold mb-8">
                <p className="text-6xl font-bold mb-8">Daily Music</p>
                <div className="scrollable-div flex flex-col w-[full] bg-[#2e2e31] items-center text-center p-10 rounded-xl relative overflow-scroll">
                    <iframe 
                        className="rounded-md min-h-[32rem]" 
                        src="https://open.spotify.com/embed/playlist/4Mpzgn9dQLqI19PVvCwGTz?utm_source=generator&theme=0" 
                        width="100%" 
                        height="352" 
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                        loading="lazy"
                    ></iframe>                    
                    {dailyMusicArray.map((currentSong, index) => (
                        <MusicRow key={index} date={currentSong.date} song={currentSong.song} artists={currentSong.artists} coverArt={currentSong.coverArt} releaseDate={currentSong.releaseDate} color={currentSong.color}/>
                    ))}   
                </div>
            </div>
        </div>
    )
}
