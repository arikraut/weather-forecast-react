import "./ListView.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import { City } from "../../types/WeatherTypes";
import { useNavigate } from "react-router-dom";

interface ListViewProps {
    currentDateTime: string;
    favoritesList?: string[];
    onClickedFavorite: () => void;
    displayedCities: City[];
}

const ListView = ({
    currentDateTime,
    favoritesList,
    onClickedFavorite,
    displayedCities,
}: ListViewProps) => {
    const navigate = useNavigate();

    if (displayedCities.length === 0) {
        return (
            <main>
                <p>No cities to show</p>
            </main>
        );
    }

    return (
        <>
            <main
                className="listview-background"
                data-testid="list-view-article"
            >
                <section className="listview-group">
                    {displayedCities.map((city) => {
                        const to = {
                            pathname: `/detailed-forecast/${city.name.toLowerCase()}`,
                        };

                        const handleNavigate = () => {
                            navigate(to);
                        };

                        return (
                            <WeatherCard
                                cityName={city.name}
                                currentDateTime={currentDateTime}
                                favoritesList={favoritesList}
                                key={city.name}
                                weather={city.timeseries}
                                onClickedFavorite={onClickedFavorite}
                                onClick={handleNavigate}
                                data-testid="WeatherCardId2"
                            />
                        );
                    })}
                </section>
            </main>
        </>
    );
};

export default ListView;
