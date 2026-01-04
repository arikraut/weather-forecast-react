import ExtendedWeatherCard from "../../components/ExtendedWeatherCard/ExtendedWeatherCard";
import { WeatherData } from "../../types/WeatherTypes";
import { formatTimestamp } from "../../utils/dateUtils";
import { capitalizeString, findCityByName } from "../../utils/cityUtils";

// External imports
import { FaArrowLeft } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

import "./DetailedWeatherPage.css";

interface DetailedWeatherPageProps {
    weatherData: WeatherData;
}

const DetailedWeatherPage = ({ weatherData }: DetailedWeatherPageProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const pathnameParts = location.pathname.split("/");
    const cityName = pathnameParts[pathnameParts.length - 1];
    const cityData = findCityByName(capitalizeString(cityName), weatherData);

    const handleGoBack = () => {
        navigate("/");
    };

    if (cityData)
        return (
            <main className="wrapper">
                <section className="back-button">
                    <FaArrowLeft
                        background="transparent"
                        color="white"
                        size={50}
                        onClick={handleGoBack}
                    />
                </section>

                <h1>{capitalizeString(cityName)}</h1>

                <section className="detailed-forecast">
                    {cityData.timeseries.slice(2, 8)?.map((weather, index) => (
                        <div key={index} className="detailed-forecast-card">
                            <h3 className="detailed-forecast-time">
                                {formatTimestamp(weather.time)}
                            </h3>
                            <ExtendedWeatherCard
                                temperature={weather.temperature}
                                weatherIcon={weather.weatherIcon}
                            />
                        </div>
                    ))}
                </section>
            </main>
        );
};

export default DetailedWeatherPage;
