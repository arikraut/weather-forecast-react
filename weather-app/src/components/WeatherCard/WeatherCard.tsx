//  .css files:
import "./WeatherCard.css";

//  Third-party packages:
import * as Icons from "react-icons/bs";

//  Utils:
import { getCurrentWeatherIndex } from "../../utils/weatherUtils";
import { getWeatherSymbol } from "../../utils/weatherUtils";

//  Components:
import FavButton from "../FavoriteButton/FavoriteButton";

//  Types:
import { Weather, weatherSymbolKeys } from "../../types/WeatherTypes";

interface WeatherCardProps {
    cityName: string;
    weather: Weather[];
    currentDateTime: string;
    favoritesList?: string[];
    onClickedFavorite: () => void;
    onClick: () => void;
}

const WeatherCard = ({
    cityName,
    weather,
    currentDateTime,
    favoritesList,
    onClickedFavorite,
    onClick,
}: WeatherCardProps) => {
    const timeseriesIndex = getCurrentWeatherIndex(currentDateTime, weather);
    const weatherIcon = weather[timeseriesIndex].weatherIcon;
    const weatherIconTyped = weatherIcon as keyof typeof weatherSymbolKeys;
    const weatherSymbol = getWeatherSymbol(weatherIconTyped);
    const FaIcon = Icons[weatherSymbol as keyof typeof Icons];

    // Event handler for the WeatherCardLarge component (excluding FavButton)
    const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // Check if the clicked element is not the FavButton
        if (!(e.target as HTMLDivElement).closest(".weather-card-fav-button")) {
            onClick();
        }
    };

    return (
        <>
            <main className="weather-card-wrapper" onClick={handleCardClick}>
                <section className="weather-card-background">
                    <section className="weather-card">
                        <section className="weather-card-grid">
                            <h3
                                className="weather-card-city"
                                data-testid="weather-card-city-name"
                            >
                                {cityName}
                            </h3>
                            <h3 className="weather-card-temperature">
                                {weather[timeseriesIndex].temperature
                                    ? weather[timeseriesIndex].temperature +
                                      "°C"
                                    : ""}
                            </h3>
                            <div className="weather-card-icon">
                                {weatherSymbol === "-" || !FaIcon ? (
                                    <p>Icon not found!</p>
                                ) : (
                                    <FaIcon size={30} />
                                )}
                            </div>
                            <section className="weather-card-fav-button">
                                <FavButton
                                    cityName={cityName}
                                    favoritesList={favoritesList}
                                    onClickedFavorite={onClickedFavorite}
                                    size={30}
                                />
                            </section>
                        </section>
                    </section>
                </section>
            </main>
        </>
    );
};

export default WeatherCard;
