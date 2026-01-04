import {
    render,
    screen,
    fireEvent,
    waitFor,
    within,
    cleanup,
} from "@testing-library/react";
import { vi } from "vitest";
import App from "../../App";
import ArrowButton from "../../components/ArrowButton/ArrowButton";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/**
 * Test if the arrow button highlights when the mouse hovers over the component.
 */
describe("ArrowButton component", () => {
    afterEach(() => {
        cleanup();
    });

    it("should highlight when hovered over", () => {
        render(<ArrowButton forward={false} />);

        const arrowButton = screen.getByTestId("arrow-button");

        fireEvent.mouseOver(arrowButton);

        expect(arrowButton).toHaveStyle("color: 4e949f");
    });

    /**
     * Renders Application, clicks right arrow button and tests if
     * the weather carousel component renders a new weather card.
     */
    it("should change the weather card in the carousel", () => {
        const queryClient = new QueryClient();

        render(
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        );

        waitFor(() => {
            const weatherDisplayComponent =
                screen.getByTestId("WeatherDisplayId");
            const weatherCardCarouselComponent = within(
                weatherDisplayComponent
            ).getByTestId("WeatherCardCarouselId");

            const arrowButtonComponent = within(
                weatherCardCarouselComponent
            ).getByTestId("ArrowButtonId");
            const initialWeatherCardComponent = within(
                weatherCardCarouselComponent
            ).getByTestId("WeatherCardLargeId");

            const onClickedFavorite = vi.fn();

            fireEvent.click(arrowButtonComponent);
            expect(onClickedFavorite).toHaveBeenCalled();

            waitFor(() => {
                // Capture the new weather card component
                const newWeatherCardComponent = within(
                    weatherCardCarouselComponent
                ).getByTestId("WeatherCardLargeId");

                // Assert that the new weather card is different from the initial one
                expect(newWeatherCardComponent).not.toBe(
                    initialWeatherCardComponent
                );
            });
        });
    });
});
