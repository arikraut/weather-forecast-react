import { WeatherData, City, Country } from "../types/WeatherTypes";

/**
 * @param weatherData
 * @returns a list of all City objects in weatherData
 */
export const getAllCities = (weatherData: WeatherData) => {
    const allCities: City[] = [];
    weatherData.countries.forEach((country: Country) => {
        country.cities.forEach((city: City) => {
            allCities.push(city);
        });
    });
    return allCities;
};

/**
 * Finds and returns all cities from weatherData that are listed as favorites
 *
 * @param favoritedCities List of the names of cities favorited by the user
 * @param weatherData WeatherData object containing all countries and cities
 * @returns a list of favorited cities as City objects
 */
export const getFavoriteCities = (
    favoritedCities: string[],
    weatherData: WeatherData
) => {
    const allCities = getAllCities(weatherData);
    const favoriteList = allCities.filter((city) =>
        favoritedCities.includes(city.name)
    );
    return favoriteList;
};

/**
 * Checks if a given city is favorited by the user
 *
 * @param cityName Name of the city to be checked
 * @param favoritedCities List of the names of cities favorited by the user
 * @returns True if the given city is favorited, otherwise returns false
 */
export const isCityinFavoriteList = (
    cityName: string,
    favoritedCities: string[]
) => {
    return favoritedCities.includes(cityName);
};

/**
 * Finds and returns City object from WeatherData object corresponding to given cityName
 *
 * @param cityName name of city to find
 * @param data WeatherData object to search through
 * @returns City object if found, else undefined
 */
export const findCityByName = (
    cityName: string,
    data: WeatherData
): City | undefined => {
    for (const country of data.countries) {
        const foundCity = country.cities.find((city) => city.name === cityName);
        if (foundCity) {
            return foundCity;
        }
    }
    return undefined; // Return undefined if the city is not found
};

/**
 * Capitalizes the first word of a given string
 *
 * @param input the string to be capitalized
 * @returns the capitalized string if it is defined, otherwise returns the original string
 */
export const capitalizeString = (input: string) => {
    if (!input) {
        return input;
    }

    return input.charAt(0).toUpperCase() + input.slice(1);
};
