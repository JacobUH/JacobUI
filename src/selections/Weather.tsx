import {WeatherData} from "../../../resources/interface";
import CurrentWeather, { HourlyForecast, WeeklyForecast } from "../widgets/weatherWidgets";

interface WeatherProps {
    weatherData: WeatherData | null;
}

export default function Weather() {

    return (
        <div className="flex flex-col m-10 gap-6">
            <p className="text-6xl font-bold mb-8">Weather</p>
            <div className="flex flex-row gap-6">
                <CurrentWeather />
                <HourlyForecast />
            </div>
            <WeeklyForecast />
        </div>
    );
};
