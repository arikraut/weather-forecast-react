//  .css files:
import "./ExtendedWeatherCard.css";

//  Third-party packages:
import * as Icons from "react-icons/bs";

//  Utils:
import { getWeatherSymbol } from "../../utils/weatherUtils";

//  Components:

//  Types:
import { weatherSymbolKeys } from "../../types/WeatherTypes";

interface ExtendedWeatherCardProps {
    temperature: number;
    weatherIcon: string;
}

const ExtendedWeatherCard = ({
    temperature,
    weatherIcon,
}: ExtendedWeatherCardProps) => {
    const weatherIconTyped = weatherIcon as keyof typeof weatherSymbolKeys;
    const weatherSymbol = getWeatherSymbol(weatherIconTyped);
    const FaIcon = Icons[weatherSymbol as keyof typeof Icons];

    return (
        <>
            <main className="extended-weather-card-wrapper">
                <section className="extended-weather-card-background">
                    <section className="extended-weather-card">
                        {temperature === Infinity || weatherIcon === "" ? (
                            <h3>No data available</h3>
                        ) : (
                            <section className="extended-weather-card-grid">
                                <h3 className="extended-weather-card-temperature">
                                    {temperature ? temperature + "°C" : "- °C"}
                                </h3>
                                <div className="extended-weather-card-icon">
                                    {weatherSymbol === "-" || !FaIcon ? (
                                        <p>Icon not found</p>
                                    ) : (
                                        <FaIcon size={70} />
                                    )}
                                </div>
                            </section>
                        )}
                    </section>
                </section>
            </main>
        </>
    );
};

export default ExtendedWeatherCard;
