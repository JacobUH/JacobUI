import { useSelector } from "react-redux"
import { RootState } from "@/lib/store"    


export default function CurrentWeather() {
    const weatherData = useSelector((state: RootState) => state.weatherState.data)

    return (
        <div className=" bg-[#2e2e31] h-96 text-center p-10 rounded-xl">
            <p className="text-2xl font-black">Current Weather</p>
            {weatherData ? (
            <div className="flex gap-16 items-center font-normal justify-center py-5 h-[90%]">
                <div className="flex flex-col">
                    <div className="text-xl">{weatherData.location.name}</div>
                    <div className="text-base mb-4">{weatherData.location.region}</div>
                    <div className="text-7xl font-normal">{Math.round(weatherData.current.temp_f).toString()}</div>
                    <div className="text-base mt-4">{"Feels like " + weatherData.current.feelslike_f}°F</div>
                </div>
                <div className="flex flex-col">
                    <img className=" size-32" src={weatherData.current.condition.icon} alt="Weather Icon" />
                    <div className="text-xl">{weatherData.current.condition.text}</div>
                </div>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-row justify-between">
                        <p className="text-xl mr-32">Wind Gusts</p>
                        <p className="text-xl">{weatherData.current.wind_mph}MPH {weatherData.current.wind_dir}</p>
                    </div>
                    <div className="flex flex-row justify-between">
                        <p className="text-xl">Humidity</p>
                        <p className="text-xl">{weatherData.current.humidity}%</p>
                    </div>
                    <div className="flex flex-row justify-between">
                        <p className="text-xl">Rain Chance</p>
                        <p className="text-xl">{weatherData.forecast.forecastday[0].day.daily_will_it_rain ? "Yes" : "Hell Nah"}</p>
                    </div>
                </div>
            </div>
            ) : (
                <p className="p-5">Loading weather data...</p>
            )}
        </div>
        
    )
}

export function HourlyForecast() {
    const weatherData = useSelector((state: RootState) => state.weatherState.data)

    const now = new Date();
    const currentHour = now.getHours();

    // Filter the next 5 hours from the current hour
    const nextFiveHours = weatherData?.forecast.forecastday[0].hour.filter((hourlyData) => {
        const hour = new Date(hourlyData.time).getHours();
        return hour > currentHour && hour < currentHour + 6;
    });

    const formatTime = (time: any) => {
        const date = new Date(time);
        let hours = date.getHours();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        return hours + ampm;
      };
      

    return (
        // <div className=" bg-[#2e2e31] h-96 text-center p-10 rounded-xl">
        //     <p className="text-2xl font-black">Hourly Forecast</p>
        //     <div className="flex gap-16 items-center font-normal justify-center py-5 h-[90%]">
        //     </div>
            
        // </div>
        <div className="flex flex-col flex-grow bg-[#2e2e31] text-center p-10 rounded-xl">
            <p className="text-2xl font-black">Hourly Forecast</p>
            <div className=" flex gap-16 rounded-xl justify-center items-center h-[90%] px-10">
                {weatherData ? (
                    <div className="flex flex-grow text-xl justify-between">
                        {nextFiveHours?.map((hourlyData, hourIndex) => (
                                <div className="flex flex-col p-2 text-base gap-4" key={hourIndex}>
                                    <p className="text-lg">{(formatTime(hourlyData.time))}</p>
                                    <p className="text-5xl font-bold">{Math.round(hourlyData.temp_f)}</p>
                                    <img src={hourlyData.condition.icon} />
                            </div>
                        ))}
                    </div>
                    ) : <p className="p-5">Loading weather data...</p>
                }
            </div>
        </div>
        
    )
}

export function WeeklyForecast() {
    const weatherData = useSelector((state: RootState) => state.weatherState.data)

    const getDayOfWeek = (dateString: string | number | Date) => {
        const date = new Date(dateString);
        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return daysOfWeek[date.getUTCDay()];
      };     

    return (
        <div className=" bg-[#2e2e31] h-[32rem] text-center text-2xl font-black p-10 rounded-xl">
            <p className="text-2xl font-black">Weekly Forecast</p>
            <div className=" flex flex-grow gap-16 rounded-xl justify-between items-center h-[90%] px-10">
                {weatherData ? weatherData.forecast.forecastday.map((forecastDay, index) => (
                    <div className=" flex flex-col text-3xl" key={index}>
                        <p>{getDayOfWeek(forecastDay.date)}</p> 
                        <img className="w-36 h-36" src={forecastDay.day.condition.icon} alt="forecast icon"/>
                        <div className="flex flex-col gap-2 mt-5 text-base">   
                            <p>{"High: " + Math.round(forecastDay.day.maxtemp_f)}</p>
                            <p>{"Avg: " + Math.round(forecastDay.day.avgtemp_f)}</p>
                            <p>{"Low: " + Math.round(forecastDay.day.mintemp_f)}</p>
                            <p>{"Humidity: " + forecastDay.day.avghumidity}%</p>
                            <p>{"Rain: " + forecastDay.day.daily_chance_of_rain}%</p>
                        </div>
                        
                    </div>
                )) : <p className="p-5">Loading weather data...</p>
                }
            </div>
        </div>
        
    )
}
