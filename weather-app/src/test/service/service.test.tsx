import {
    fetchWeatherDataForAllCountries,
    fetchWeatherDataForCity,
} from "../../api/http";
import { server } from "../mocks/server";

import { exampleWeatherData } from "../exampleData/exampleWeatherData";

beforeAll(() => {
    // Configure the server to use the handlers defined in handlers.ts
    server.listen();
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());

test("Correctly maps weatherData object using response from API GET request", async () => {
    const weatherData = await fetchWeatherDataForAllCountries();

    expect(weatherData).toEqual(exampleWeatherData);
});

test("Returns error message on API error", async () => {
    try {
        await fetchWeatherDataForCity("Oslo", 91, 180);
        // If the function doesn't throw an error, fail the test
        expect(true).toBe(false);
    } catch (error) {
        if (error instanceof Error) {
            expect(error.message).toEqual("Network response was not ok");
        }
    }
});
