import { Weather, weatherSymbolKeys } from "../types/WeatherTypes";

/**
 * Get the weather corresponding to the current 60-minute period
 *
 * @param currentDatetime The current date and time in ISO format (2 hours behind)
 * @param timeseries List of Weather objects detailing the weather of the city for the next
 * @returns
 */
export const getCurrentWeather = (
    currentDatetime: string,
    timeseries: Weather[]
) => {
    for (const weather of timeseries) {
        if (weather.time === currentDatetime) {
            return weather;
        }
    }

    console.log("Current weather unavailable");
    return null;
};

/**
 * Calculates the index of weather corresponding to the current 60-minute period
 *
 * @param currentDatetime The current date and time in ISO format (2 hours behind)
 * @param timeseries List of Weather objects detailing the weather of the city for the next
 * @returns
 */
export const getCurrentWeatherIndex = (
    currentDatetime: string,
    timeseries: Weather[]
) => {
    for (let i = 0; i < timeseries.length; i++) {
        if (timeseries[i].time === currentDatetime) {
            return i;
        }
    }
    // Weather not found in the array
    console.log("Current weather unavailable");
    return -1;
};

/**
 * Get the react icon symbol name corresponding to the APIs weather symbols
 * mapped in the weatherSymbolKeys in ../types/WeatherTypes
 *
 * @param weatherIcon Weather icon code from the API
 * @returns React Icon name of the corresponding icon
 */
export const getWeatherSymbol = (
    weatherIcon: keyof typeof weatherSymbolKeys
): string => {
    return weatherSymbolKeys[weatherIcon] || "";
};
