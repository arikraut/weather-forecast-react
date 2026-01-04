import { Coordinate, CountryInfo } from "../types/WeatherTypes";

export const norwayCoordinates: Coordinate = {
    Oslo: [59.91, 10.75],
    Trondheim: [63.43, 10.4],
    Alta: [69.97, 23.27],
    Bergen: [60.39, 5.32],
};

export const swedenCoordinates: Coordinate = {
    Stockholm: [59.33, 18.06],
    Gothenburg: [57.71, 11.97],
    Helsingborg: [56.05, 12.69],
    Kiruna: [67.86, 20.23],
};

export const denmarkCoordinates: Coordinate = {
    Copenhagen: [55.68, 12.57],
    Odense: [55.4, 10.38],
    Aalborg: [57.05, 9.92],
    Esbjerg: [55.47, 8.45],
};

export const norway: CountryInfo = {
    name: "Norway",
    cities: norwayCoordinates,
};

export const sweden: CountryInfo = {
    name: "Sweden",
    cities: swedenCoordinates,
};

export const denmark: CountryInfo = {
    name: "Denmark",
    cities: denmarkCoordinates,
};

export const countries = [norway, sweden, denmark];
