import {
    render,
    screen,
    fireEvent,
    within,
    waitFor,
    cleanup,
} from "@testing-library/react";
import { vi } from "vitest";
import FavButton from "../../components/FavoriteButton/FavoriteButton";
import App from "../../App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/**
 * Test that renders the favorite icon and checks that it fills in when the button is clicked.
 */
describe("FavoriteButton", () => {
    afterEach(() => {
        cleanup();
    });

    it("should highlight/fill when clicked", () => {
        const favoritesList = ["City1", "City2"];
        const cityName = "City1";
        const onClickedFavorite = vi.fn();
        const size = 24;

        render(
            <FavButton
                favoritesList={favoritesList}
                cityName={cityName}
                onClickedFavorite={onClickedFavorite}
                size={size}
            />
        );

        const button = screen.getByTestId("heartIconId");

        fireEvent.click(button);

        expect(onClickedFavorite).toHaveBeenCalled();
        expect(button).toHaveStyle("background: transparent color: red;");
    });
});

/**
 * Test that a new weather card renders as a favorite if favButton is clicked, and
 * that the weather card on favorites is no longer rendering if favButton is clicked again.
 */
describe("Favorites in App", () => {
    it("should render liked city after first click on favorite button then disappear after second click", () => {
        const queryClient = new QueryClient();

        render(
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        );

        waitFor(async () => {
            // Find favorite button
            const weatherDisplayComponent =
                screen.getByTestId("WeatherDisplayId");
            const weatherCardCarouselComponent = within(
                weatherDisplayComponent
            ).getByTestId("WeatherCardCarouselId");
            const weatherCardLargeComponent = within(
                weatherCardCarouselComponent
            ).getByTestId("WeatherCardLargeId");
            const favButtonComponent = within(
                weatherCardLargeComponent
            ).getByTestId("FavButtonId");
            const favButton =
                within(favButtonComponent).getByTestId("fav-button");

            // Click on favorite button
            const onClickedFavorite = vi.fn();

            fireEvent.click(favButton);
            expect(onClickedFavorite).toHaveBeenCalled();

            const choiceButtonFavoritesElement = await within(
                weatherDisplayComponent
            ).findByTestId("choice-button-Favorites");

            fireEvent.click(choiceButtonFavoritesElement);

            await waitFor(async () => {
                // Find weathercard in favorites list view 1
                const favoriteComponent = within(
                    weatherDisplayComponent
                ).getByTestId("FavoritesId");
                const weatherCard =
                    within(favoriteComponent).getByTestId("WeatherCardId");

                expect(weatherCard).toBeInTheDocument();

                // Find weathercard in favorites list view 2
                const listViewButtonElement = await within(
                    weatherDisplayComponent
                ).findByTestId("change-view-button");

                fireEvent.click(listViewButtonElement);

                await waitFor(() => {
                    expect(weatherCard).not.toBeInTheDocument;
                });
            });

            // Click on favorite button again
            const onClickedFavoriteAgain = vi.fn();

            fireEvent.click(favButton);
            expect(onClickedFavoriteAgain).toHaveBeenCalled();

            await waitFor(async () => {
                // No weathercard in favorites list view 1
                const favoriteComponent = within(
                    weatherDisplayComponent
                ).getByTestId("FavoritesId");
                const weatherCard =
                    within(favoriteComponent).getByTestId("WeatherCardId");

                expect(weatherCard).not.toBeInTheDocument();

                // No weathercard in favorites list view 2
                const listViewButtonElement = await within(
                    weatherDisplayComponent
                ).findByTestId("change-view-button");

                fireEvent.click(listViewButtonElement);

                await waitFor(() => {
                    expect(weatherCard).not.toBeInTheDocument;
                });
            });
        });
    });
});
