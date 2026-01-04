import {
    RenderResult,
    cleanup,
    fireEvent,
    render,
    screen,
    waitFor,
    within,
} from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "../../pages/HomePage/HomePage";
import { MemoryRouter } from "react-router-dom";

describe("ListView", () => {
    let renderResult: RenderResult;
    const queryClient = new QueryClient();

    beforeEach(() => {
        renderResult = render(
            <MemoryRouter>
                <QueryClientProvider client={queryClient}>
                    <HomePage />
                </QueryClientProvider>
            </MemoryRouter>
        );
    });

    afterEach(() => {
        cleanup();
    });

    it("renders app in ListView correctly", async () => {
        const { getByTestId, asFragment } = renderResult;

        const weatherDisplayElement = getByTestId("weather-display-id");
        const listViewButtonElement = await within(
            weatherDisplayElement
        ).findByTestId("change-view-button");

        fireEvent.click(listViewButtonElement);

        await waitFor(() => {
            expect(asFragment()).toMatchSnapshot();
        });
    });

    it("renders ListView when button is cliked", async () => {
        const weatherDisplayElement = screen.getByTestId("weather-display-id");
        const listViewButtonElement = await within(
            weatherDisplayElement
        ).findByTestId("change-view-button");

        fireEvent.click(listViewButtonElement);

        await waitFor(() => {
            const listViewElements = screen.getByTestId("list-view-article");
            expect(listViewElements).toBeInTheDocument();
        });
    });

    it("renders WeatherCards in ListView when changing countries", async () => {
        const weatherDisplayElement = screen.getByTestId("weather-display-id");
        const choiceButtonNorwayElement = await within(
            weatherDisplayElement
        ).findByTestId("choice-button-Norway");
        const choiceButtonSwedenElement = await within(
            weatherDisplayElement
        ).findByTestId("choice-button-Sweden");

        const listViewButtonElement = await within(
            weatherDisplayElement
        ).findByTestId("change-view-button");

        fireEvent.click(choiceButtonNorwayElement);
        fireEvent.click(listViewButtonElement);

        fireEvent.click(listViewButtonElement);

        await waitFor(() => {
            const listViewElements = screen.getByTestId("list-view-article");
            expect(listViewElements).toBeInTheDocument();
        });

        fireEvent.click(choiceButtonNorwayElement);

        await waitFor(() => {
            const listViewElements = screen.getByTestId("list-view-article");
            expect(listViewElements).toBeInTheDocument();
        });

        fireEvent.click(choiceButtonSwedenElement);

        await waitFor(() => {
            const listViewElements = screen.getByTestId("list-view-article");
            expect(listViewElements).toBeInTheDocument();
        });
    });
});
