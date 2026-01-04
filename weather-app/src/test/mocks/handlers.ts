import { rest } from "msw";

/**
 * Checks if latitude value is valid (is between -90 to 90)
 *
 * @param lat Latitude
 * @returns true if the latitude is between -90 and 90, otherwise returns false
 */
const validLatitude = (lat: number) => {
    return Math.abs(lat) <= 90;
};

/**
 * Checks if longtitude value is valid (is between -180 to 180)
 *
 * @param lon Longitude
 * @returns true if the longitude is between -180 and 180, otherwise returns false
 */
const validLongitude = (lon: number) => {
    return Math.abs(lon) <= 180;
};

export const handlers = [
    rest.get(
        "https://api.met.no/weatherapi/locationforecast/2.0/compact",
        (req, res, ctx) => {
            const lat = req.url.searchParams.get("lat");
            const lon = req.url.searchParams.get("lon");

            if (!validLatitude(Number(lat)) || !validLongitude(Number(lon))) {
                return res(
                    ctx.status(400),
                    ctx.json({
                        errorMessage: "Network response was not ok",
                    })
                );
            }

            // Returns an object with the same structure as the API, but with a shorter timeseries
            // to make the testing simpler
            return res(
                ctx.delay(1000),
                ctx.status(200),
                ctx.json({
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: [10.7556, 59.91, 4],
                    },
                    properties: {
                        meta: {
                            updated_at: "2023-09-19T12:38:13Z",
                            units: {
                                air_pressure_at_sea_level: "hPa",
                                air_temperature: "celsius",
                                cloud_area_fraction: "%",
                                precipitation_amount: "mm",
                                relative_humidity: "%",
                                wind_from_direction: "degrees",
                                wind_speed: "m/s",
                            },
                        },
                        timeseries: [
                            {
                                time: "2023-09-19T13:00:00Z",
                                data: {
                                    instant: {
                                        details: {
                                            air_pressure_at_sea_level: 989.1,
                                            air_temperature: 16.7,
                                            cloud_area_fraction: 77.8,
                                            relative_humidity: 59.6,
                                            wind_from_direction: 212.3,
                                            wind_speed: 7.3,
                                        },
                                    },
                                    next_12_hours: {
                                        summary: {
                                            symbol_code: "cloudy",
                                        },
                                    },
                                    next_1_hours: {
                                        summary: {
                                            symbol_code: "cloudy",
                                        },
                                        details: {
                                            precipitation_amount: 0.0,
                                        },
                                    },
                                    next_6_hours: {
                                        summary: {
                                            symbol_code: "partlycloudy_night",
                                        },
                                        details: {
                                            precipitation_amount: 0.0,
                                        },
                                    },
                                },
                            },
                        ],
                    },
                })
            );
        }
    ),
];
