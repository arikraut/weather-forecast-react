//  .css files:
import "./WeatherCardCarousel.css";

// Third-party packages:
import { useState } from "react";

// Utils:
import { getCurrentWeatherIndex } from "../../utils/weatherUtils";

// Components:
import ArrowButton from "../ArrowButton/ArrowButton";
import WeatherCardLarge from "../WeatherCardLarge/WeatherCardLarge";

// Types:
import { City } from "../../types/WeatherTypes";
import { useNavigate } from "react-router-dom";

interface WeatherCardCarouselProps {
    displayedCities: City[];
    currentDateTime: string;
    favoritesList?: string[];
    onClickedFavorite: () => void;
}

const WeatherCardCarousel = ({
    displayedCities,
    currentDateTime,
    favoritesList,
    onClickedFavorite,
}: WeatherCardCarouselProps) => {
    const [displayedCityIndex, setDisplayedCityIndex] = useState<number>(0);

    //  Path for navigation to the movie’s detail page.
    const to = {
        pathname: `/detailed-forecast/${
            displayedCities[displayedCityIndex]?.name?.toLowerCase() || ""
        }`,
    };

    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate(to);
    };

    /**
     * Calculates the index of the next city to be shown based on the current displayed city
     * and whether the following or previous city is to be displayed
     *
     * @param cities Array of City objects for the chosen country that the carousel is to go through
     * @param currentCityIndex Index in the cities array of the city currently displayed
     * @param forward True when we want the following index and false when we want the previous
     * @returns The index of the next city to be shown or -1 if the city does not exist in the cities array
     */
    const nextCityIndex = (
        cities: City[],
        currentCityIndex: number,
        forward: boolean
    ) => {
        if (forward) {
            if (currentCityIndex === cities.length - 1) {
                return 0;
            } else {
                return currentCityIndex + 1;
            }
        } else {
            if (currentCityIndex === 0) {
                return cities.length - 1;
            } else {
                return currentCityIndex - 1;
            }
        }
    };

    if (!displayedCities || displayedCities.length === 0) {
        return (
            <main>
                <p>No cities to show</p>
            </main>
        );
    }

    const timeseriesIndex = getCurrentWeatherIndex(
        currentDateTime,
        displayedCities[displayedCityIndex].timeseries
    );

    return (
        <main className="weather-carousel-grid">
            <div
                className="arrow-button-left"
                onClick={() =>
                    setDisplayedCityIndex(
                        nextCityIndex(
                            displayedCities,
                            displayedCityIndex,
                            false
                        )
                    )
                }
            >
                <ArrowButton forward={false} data-testid="ArrowButtonId" />
            </div>
            <section className="weather-card-carousel">
                {timeseriesIndex !== null ? (
                    <WeatherCardLarge
                        city={displayedCities[displayedCityIndex].name}
                        favoritesList={favoritesList}
                        temperature={
                            displayedCities[displayedCityIndex].timeseries[
                                timeseriesIndex
                            ].temperature
                        }
                        weatherIcon={
                            displayedCities[displayedCityIndex].timeseries[
                                timeseriesIndex
                            ].weatherIcon
                        }
                        onClickedFavorite={onClickedFavorite}
                        onClick={handleNavigate}
                        data-testid="WeatherCardLargeId"
                    />
                ) : (
                    <WeatherCardLarge
                        favoritesList={favoritesList}
                        city=""
                        temperature={Infinity}
                        weatherIcon=""
                        onClickedFavorite={onClickedFavorite}
                        onClick={handleNavigate}
                    />
                )}
            </section>
            <div
                className="arrow-button-right"
                onClick={() =>
                    setDisplayedCityIndex(
                        nextCityIndex(displayedCities, displayedCityIndex, true)
                    )
                }
            >
                <ArrowButton forward />
            </div>
        </main>
    );
};

export default WeatherCardCarousel;
