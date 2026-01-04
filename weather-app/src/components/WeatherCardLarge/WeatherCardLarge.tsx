//  .css files:
import "./WeatherCardLarge.css";

//  Third-party packages:
import * as Icons from "react-icons/bs";

//  Utils:
import { getWeatherSymbol } from "../../utils/weatherUtils";

//  Components:
import FavButton from "../FavoriteButton/FavoriteButton";

//  Types:
import { weatherSymbolKeys } from "../../types/WeatherTypes";

interface WeatherCardLargeProps {
    city: string;
    favoritesList?: string[];
    temperature: number;
    weatherIcon: string;
    onClickedFavorite: () => void;
    onClick: () => void;
}

const WeatherCardLarge = ({
    city,
    favoritesList,
    temperature,
    weatherIcon,
    onClickedFavorite,
    onClick,
}: WeatherCardLargeProps) => {
    const weatherIconTyped = weatherIcon as keyof typeof weatherSymbolKeys;
    const weatherSymbol = getWeatherSymbol(weatherIconTyped);
    const FaIcon = Icons[weatherSymbol as keyof typeof Icons];

    // Event handler for the WeatherCardLarge component (excluding FavButton)
    const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // Check if the clicked element is not the FavButton
        if (
            !(e.target as HTMLDivElement).closest(
                ".weather-card-large-fav-button"
            )
        ) {
            onClick();
        }
    };

    return (
        <>
            <main
                className="weather-card-large-wrapper"
                onClick={handleCardClick}
            >
                <section className="weather-card-large-background">
                    <section className="weather-card-large">
                        {city === "" ||
                        temperature === Infinity ||
                        weatherIcon === "" ? (
                            <h3>No data available</h3>
                        ) : (
                            <section className="weather-card-large-grid">
                                <h3 className="weather-card-large-city">
                                    {city}
                                </h3>
                                <h3 className="weather-card-large-temperature">
                                    {temperature ? temperature + "°C" : "-°C"}
                                </h3>
                                <div className="weather-card-large-icon">
                                    {weatherSymbol === "-" || !FaIcon ? (
                                        <p>Icon not found!</p>
                                    ) : (
                                        <FaIcon size={100} />
                                    )}
                                </div>
                                <div className="weather-card-large-fav-button">
                                    <FavButton
                                        cityName={city}
                                        favoritesList={favoritesList}
                                        size={50}
                                        onClickedFavorite={onClickedFavorite}
                                        data-testid="FavButtonId"
                                    />
                                </div>
                            </section>
                        )}
                    </section>
                </section>
            </main>
        </>
    );
};

export default WeatherCardLarge;
