export type WeatherData = {
    countries: Country[];
};

export type Country = {
    name: string;
    cities: City[];
};

export type City = {
    name: string;
    timeseries: Weather[];
};

export type Weather = {
    time: string;
    temperature: number;
    weatherIcon: string;
};

export type Coordinate = {
    [key: string]: [number, number];
};

export type CountryInfo = {
    name: string;
    cities: Coordinate;
};

// Mapping of API symbols to react icons
// Values derived from the APIs symbol repo:
// https://github.com/nrkno/yr-weather-symbols/blob/master/src/index.ts
export const weatherSymbolKeys = {
    clearsky_day: "BsSunFill",
    clearsky_night: "BsMoonFill",
    clearsky_polartwilight: "BsSunFill",
    fair_day: "BsFillCloudSunFill",
    fair_night: "BsFillCloudMoonFill",
    fair_polartwilight: "BsFillCloudSunFill",
    partlycloudy_day: "BsCloudSun",
    partlycloudy_night: "BsFillCloudMoonFill",
    partlycloudy_polartwilight: "BsCloudSunFill",
    cloudy: "BsFillCloudFill",
    rainshowers_day: "BsFillCloudRainFill",
    rainshowers_night: "BsFillCloudRainFill",
    rainshowers_polartwilight: "BsFillCloudRainFill",
    rainshowersandthunder_day: "BsFillCloudLightningRainFill",
    rainshowersandthunder_night: "BsFillCloudLightningRainFill",
    rainshowersandthunder_polartwilight: "BsFillCloudLightningRainFill",
    sleetshowers_day: "BsFillCloudSleetFill",
    sleetshowers_night: "BsFillCloudSleetFill",
    sleetshowers_polartwilight: "BsFillCloudSleetFill",
    snowshowers_day: "BsFillCloudSnowFill",
    snowshowers_night: "BsFillCloudSnowFill",
    snowshowers_polartwilight: "BsFillCloudSnowFill",
    rain: "BsFillCloudRainFill",
    heavyrain: "BsFillCloudRainHeavyFill",
    heavyrainandthunder: "BsFillCloudLightningRainFill",
    sleet: "BsFillCloudSleetFill",
    snow: "BsCloudSnowFill",
    snowandthunder: "BsFillCloudLightningFill",
    fog: "BsFillCloudFogFill",
    sleetshowersandthunder_day: "BsFillCloudSleetFill",
    sleetshowersandthunder_night: "BsFillCloudSleetFill",
    sleetshowersandthunder_polartwilight: "BsFillCloudSleetFill",
    snowshowersandthunder_day: "BsFillCloudLightningRainFill",
    snowshowersandthunder_night: "BsFillCloudLightningRainFill",
    snowshowersandthunder_polartwilight: "BsFillCloudLightningRainFill",
    rainandthunder: "BsFillCloudLightningRainFill",
    sleetandthunder: "BsFillCloudLightningRainFill",
    lightrainshowersandthunder_day: "BsFillCloudLightningRainFill",
    lightrainshowersandthunder_night: "BsFillCloudLightningRainFill",
    lightrainshowersandthunder_polartwilight: "BsFillCloudLightningRainFill",
    heavyrainshowersandthunder_day: "BsFillCloudLightningRainFill",
    heavyrainshowersandthunder_night: "BsFillCloudLightningRainFill",
    heavyrainshowersandthunder_polartwilight: "BsFillCloudLightningRainFill",
    lightssleetshowersandthunder_day: "BsFillCloudLightningRainFill",
    lightssleetshowersandthunder_night: "BsFillCloudLightningRainFill",
    lightssleetshowersandthunder_polartwilight: "BsFillCloudLightningRainFill",
    heavysleetshowersandthunder_day: "BsFillCloudLightningRainFill",
    heavysleetshowersandthunder_night: "BsFillCloudLightningRainFill",
    heavysleetshowersandthunder_polartwilight: "BsFillCloudLightningRainFill",
    lightssnowshowersandthunder_day: "BsFillCloudLightningFill",
    lightssnowshowersandthunder_night: "BsFillCloudLightningFill",
    lightssnowshowersandthunder_polartwilight: "BsFillCloudLightningFill",
    heavysnowshowersandthunder_day: "BsFillCloudLightningFill",
    heavysnowshowersandthunder_night: "BsFillCloudLightningFill",
    heavysnowshowersandthunder_polartwilight: "BsFillCloudLightningFill",
    lightrainandthunder: "BsFillCloudLightningRainFill",
    lightsleetandthunder: "BsFillCloudLightningRainFill",
    heavysleetandthunder: "BsFillCloudLightningRainFill",
    lightsnowandthunder: "BsFillCloudLightningFill",
    heavysnowandthunder: "BsFillCloudLightningFill",
    lightrainshowers_day: "BsCloudRainFill",
    lightrainshowers_night: "BsCloudRainFill",
    lightrainshowers_polartwilight: "BsCloudRainFill",
    heavyrainshowers_day: "BsCloudRainHeavyFill",
    heavyrainshowers_night: "BsCloudRainHeavyFill",
    heavyrainshowers_polartwilight: "BsCloudRainHeavyFill",
    lightsleetshowers_day: "BsFillCloudSleetFill",
    lightsleetshowers_night: "BsFillCloudSleetFill",
    lightsleetshowers_polartwilight: "BsFillCloudSleetFill",
    heavysleetshowers_day: "BsFillCloudSleetFill",
    heavysleetshowers_night: "BsFillCloudSleetFill",
    heavysleetshowers_polartwilight: "BsFillCloudSleetFill",
    lightsnowshowers_day: "BsFillCloudSnowFill",
    lightsnowshowers_night: "BsFillCloudSnowFill",
    lightsnowshowers_polartwilight: "BsFillCloudSnowFill",
    heavysnowshowers_day: "BsFillCloudSnowFill",
    heavysnowshowers_night: "BsFillCloudSnowFill",
    heavysnowshowers_polartwilight: "BsFillCloudSnowFill",
    lightrain: "BsFillCloudRainFill",
    lightsleet: "BsFillCloudSleetFill",
    heavysleet: "BsFillCloudSleetFill",
    lightsnow: "BsFillCloudSnowFill",
    heavysnow: "BsFillCloudSnowFill",
    noData: "-",
};
