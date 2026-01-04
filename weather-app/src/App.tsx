// Third party packages
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

// Pages
import HomePage from "./pages/HomePage/HomePage";
import DetailedWeatherPage from "./pages/DetailedWeatherPage/DetailedWeatherPage";

// CSS imports
import "./App.css";
import { WeatherData } from "./types/WeatherTypes";
import { fetchWeatherDataForAllCountries } from "./api/http";

function App() {
    const [weatherData, setWeatherData] = useState<WeatherData>();

    const { isLoading, isError, error, data } = useQuery({
        queryKey: ["weatherDataForAllCountries"],
        queryFn: fetchWeatherDataForAllCountries,
    });

    useEffect(() => {
        if (data) {
            setWeatherData(data);
        }
    }, [data]);

    if (isError) {
        console.log(error);
        return (
            <main>
                <p>An error occured</p>
            </main>
        );
    }

    if (isLoading) {
        return (
            <main>
                <h2>Loading...</h2>
            </main>
        );
    }

    if (weatherData) {
        return (
            <>
                <BrowserRouter basename="/project1">
                    <Routes>
                        <Route path="*" element={<HomePage />} />
                        <Route path="/" element={<HomePage />} />
                        <Route
                            path="/detailed-forecast/:id"
                            element={
                                <DetailedWeatherPage
                                    weatherData={weatherData}
                                />
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </>
        );
    }
}

export default App;
