import { countries } from "../coordinates/Coordinates";
import { City, Country, CountryInfo, WeatherData } from "../types/WeatherTypes";

/**
 * Fetches weather data for all countries and their respective cities.
 *
 * @returns {Promise<WeatherData>} - A promise that resolves to a WeatherData object containing data from the API.
 */
export async function fetchWeatherDataForAllCountries(): Promise<WeatherData> {
    const countryPromises = countries.map((country) =>
        fetchWeatherDataForCountry(country)
    );

    const countriesData = await Promise.all(countryPromises);

    return {
        countries: countriesData,
    };
}

/**
 * Fetches weather data all cities in a given country.
 *
 * @param {CountryInfo} country - Information about the country for which weather data is to be fetched.
 * @returns {Promise<Country>} - A promise that resolves to a Country object containing weather data for the country and its cities.
 */
async function fetchWeatherDataForCountry(
    country: CountryInfo
): Promise<Country> {
    const cities = [];

    for (const cityName in country.cities) {
        const [lat, lon] = country.cities[cityName];
        const cityData = await fetchWeatherDataForCity(cityName, lat, lon);
        cities.push(cityData);
    }

    return {
        name: country.name,
        cities,
    };
}

/**
 * Fetches weather data for a specific city using the API from Metrologisk institutt
 *
 * @param {string} cityName - The name of the city for which weather data is to be fetched.
 * @param {number} lat - The latitude of the city's location.
 * @param {number} lon - The longitude of the city's location.
 * @returns {Promise<City>} - A promise that resolves to a City object containing weather data for the city.
 */
export async function fetchWeatherDataForCity(
    cityName: string,
    lat: number,
    lon: number
): Promise<City> {
    const response = await fetch(
        `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`
    );
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    const newWeatherData = await response.json();

    const newTimeseries = newWeatherData.properties.timeseries.map(
        (item: {
            time: string;
            data: {
                instant: { details: { air_temperature: number } };
                next_1_hours: { summary: { symbol_code: string } };
            };
        }) => ({
            time: item.time,
            temperature: item.data.instant.details.air_temperature,
            weatherIcon:
                item.data.next_1_hours?.summary?.symbol_code || "noData",
        })
    );
    return {
        name: cityName,
        timeseries: newTimeseries,
    };
}
