//  .css files:
import "./WeatherDisplay.css";

//  Third-party packages:
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

// Utils:
import { fetchWeatherDataForAllCountries } from "../../api/http";
import { formatDate } from "../../utils/dateUtils";
import { getFavoriteCities } from "../../utils/cityUtils";

// Components:
import ChoiceButton from "../ChoiceButton/ChoiceButton";
import WeatherCardCarousel from "../WeatherCardCarousel/WeatherCardCarousel";
import ListView from "../ListView/ListView";

// Types:
import { WeatherData } from "../../types/WeatherTypes";
import { getUpdatedViewBtnText } from "../../utils/componentUtils";

const WeatherDisplay = () => {
    const [clickedFavorite, setClickedFavorite] = useState(false);
    const [currentDateTime, setCurrentDateTime] = useState<string>(
        formatDate(new Date())
    );
    const [favorites, setFavorites] = useState<string[]>();
    const [selectedCountry, setSelectedCountry] = useState<string>("Norway");
    const [weatherData, setWeatherData] = useState<WeatherData>();
    const [carouselView, setCarouselView] = useState(
        (sessionStorage.getItem("carouselView") || true) === "true"
    );
    const [viewBtnText, setViewBtnText] = useState(
        getUpdatedViewBtnText(carouselView)
    );
    const choiceButtons = ["All", "Norway", "Sweden", "Denmark", "Favorites"];

    /**
     * Handler for button used to switch between list and carousel view
     *
     * Updates which view should be shown and the text of the button
     */
    const handleSwitchView = () => {
        setCarouselView((prevCarouselView) => {
            const newCarouselView = !prevCarouselView;

            // Update the button text based on the new state
            const newBtnText = getUpdatedViewBtnText(newCarouselView);
            setViewBtnText(newBtnText);

            return newCarouselView;
        });
    };

    const handlesSelectedChoice = (choice: string) => {
        setSelectedCountry(choice);
    };

    /**
     * Finds and returns the index of a given country within the weatherData object
     *
     * @param countryName The name of the country you want to find index for
     * @returns the index of the country in the weatherData object's countries
     */
    const getCountryIndex = (countryName: string) => {
        return weatherData
            ? weatherData.countries.findIndex(
                  (country) => country.name === countryName
              )
            : -1;
    };

    /**
     * Finds and returns all weather for the cities corresponding to the chosen filter
     *
     * @param weatherData WeatherData object
     * @param filterChoice The chosen filter to view weather for
     * @returns A list of City objects for the filter chosen
     */
    const getCitiesToDisplay = (
        weatherData: WeatherData,
        filterChoice: string
    ) => {
        if (filterChoice === "Favorites") {
            return favorites ? getFavoriteCities(favorites, weatherData) : [];
        }
        if (filterChoice === "All") {
            return weatherData.countries.flatMap(
                (country) => country.cities || []
            );
        } else {
            return weatherData.countries[getCountryIndex(selectedCountry)]
                .cities;
        }
    };

    const { isLoading, isError, error, data } = useQuery({
        queryKey: ["weatherDataForAllCountries"],
        queryFn: fetchWeatherDataForAllCountries,
    });

    useEffect(() => {
        if (data) {
            setWeatherData(data);
            setCurrentDateTime(formatDate(new Date()));
        }
    }, [data]);

    useEffect(() => {
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
    }, [clickedFavorite]);

    useEffect(() => {
        const storedChoices = localStorage.getItem("choice");
        if (storedChoices) setSelectedCountry(JSON.parse(storedChoices));
    }, []);

    useEffect(() => {
        sessionStorage.setItem("carouselView", JSON.stringify(carouselView));
    }, [carouselView]);

    return (
        <>
            <section data-testid="loading-indicator-id">
                {isLoading && <h2>Loading...</h2>}
            </section>

            {isError && (
                <h2>
                    Error occurred:{" "}
                    {error instanceof Error ? error.message : "Unknown error"}
                </h2>
            )}

            {!isLoading && weatherData && (
                <>
                    <section className="display-wrapper">
                        <section className="display-background">
                            <section className="choice-buttons">
                                <ChoiceButton
                                    ChoiceButtons={choiceButtons}
                                    onSelectedChoice={handlesSelectedChoice}
                                />
                            </section>

                            {carouselView ? (
                                <WeatherCardCarousel
                                    displayedCities={getCitiesToDisplay(
                                        weatherData,
                                        selectedCountry
                                    )}
                                    currentDateTime={currentDateTime}
                                    favoritesList={favorites}
                                    onClickedFavorite={() =>
                                        setClickedFavorite(!clickedFavorite)
                                    }
                                    data-testid="WeatherCardCarouselId"
                                />
                            ) : (
                                <ListView
                                    currentDateTime={currentDateTime}
                                    favoritesList={favorites}
                                    onClickedFavorite={() =>
                                        setClickedFavorite(!clickedFavorite)
                                    }
                                    displayedCities={getCitiesToDisplay(
                                        weatherData,
                                        selectedCountry
                                    )}
                                />
                            )}
                            <button
                                onClick={handleSwitchView}
                                className="view-button"
                                data-testid="change-view-button"
                            >
                                {viewBtnText}
                            </button>
                        </section>
                    </section>
                </>
            )}
        </>
    );
};

export default WeatherDisplay;
