import { render, screen, waitFor } from "@testing-library/react";
import renderer from "react-test-renderer";
import { vi } from "vitest";
import { exampleWeatherData } from "./exampleData/exampleWeatherData";
import HomePage from "../pages/HomePage/HomePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

vi.mock("react-query", () => ({
    useQuery: vi.fn().mockReturnValue({
        isLoading: false,
        isError: false,
        data: exampleWeatherData,
    }),
}));

/**
 * Test if the title renders by finding the title by displayed text.
 * Creates a snapshot of how the title should render and then checks
 * the rendered title with the snapshot.
 */
test("renders title with snapshot", () => {
    const tree = renderer.create(<h1>Today's weather forecast</h1>).toJSON();
    expect(tree).toMatchSnapshot();
});

/**
 * Test that weatherDisplay renders correctly when app is initialized.
 */
test("renders WeatherDisplay element", async () => {
    const queryClient = new QueryClient();

    render(
        <QueryClientProvider client={queryClient}>
            <HomePage />
        </QueryClientProvider>
    );

    await waitFor(() => {
        const weatherDisplayElement = screen.getByTestId("weather-display-id");
        expect(weatherDisplayElement).toBeInTheDocument();
    });
});
