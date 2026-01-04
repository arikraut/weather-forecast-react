import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RenderResult, render, screen } from "@testing-library/react";
import WeatherDisplay from "../../components/WeatherDisplay/WeatherDisplay";

const queryClient = new QueryClient();
let renderResult: RenderResult;

test("Shows loading state", async () => {
    render(
        <QueryClientProvider client={queryClient}>
            <WeatherDisplay />
        </QueryClientProvider>
    );

    // Check if loading indicator is displayed
    const loadingIndicator = screen.getByTestId("loading-indicator-id");
    expect(loadingIndicator).toBeInTheDocument();
});

test("Renders weatherdisplay correctly", () => {
    renderResult = render(
        <QueryClientProvider client={queryClient}>
            <WeatherDisplay />
        </QueryClientProvider>
    );
    const { asFragment } = renderResult;
    expect(asFragment()).toMatchSnapshot();
});
