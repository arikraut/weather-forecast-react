import { getFavoriteCities, isCityinFavoriteList } from "../../utils/cityUtils";
import { exampleWeatherData } from "../exampleData/exampleWeatherData";

const cityTrondheim = {
    name: "Trondheim",
    timeseries: [
        {
            time: "2023-09-19T13:00:00Z",
            temperature: 16.7,
            weatherIcon: "cloudy",
        },
    ],
};

const cityStockholm = {
    name: "Stockholm",
    timeseries: [
        {
            time: "2023-09-19T13:00:00Z",
            temperature: 16.7,
            weatherIcon: "cloudy",
        },
    ],
};

test("getFavoriteCities returns correct list of cities", () => {
    const cities = getFavoriteCities(
        ["Trondheim", "Stockholm"],
        exampleWeatherData
    );
    expect(cities).toStrictEqual([cityTrondheim, cityStockholm]);
});

test("isCityinFavoriteList returns true if city is in favorite list", () => {
    const isCityInFavoriteList = isCityinFavoriteList("Oslo", [
        "Oslo",
        "Bergen",
    ]);
    expect(isCityInFavoriteList).toBe(true);
});
