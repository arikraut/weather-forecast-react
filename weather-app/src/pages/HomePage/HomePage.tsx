import WeatherDisplay from "../../components/WeatherDisplay/WeatherDisplay";

const HomePage = () => {
    return (
        <>
            <main className="wrapper">
                <h1>Today's Weather Forecast</h1>
                <br></br>
                <section data-testid="weather-display-id">
                    <WeatherDisplay />
                </section>
            </main>
        </>
    );
};

export default HomePage;
