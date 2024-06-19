import React, { useEffect, useState } from "react";
import WeatherDisplay from "./components/WeatherDisplay";
import getFormattedWeatherData from "./services/WeatherService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Search from "./components/Search";
import Favorite from "./components/Favorite";

function App() {
  const [query, setQuery] = useState(() => {
    const lastSearchedCity = localStorage.getItem("lastSearchedCity");
    return { q: lastSearchedCity ? lastSearchedCity : "Gaya" };
  });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      if (!query.q) return;
      const message = query.q ? query.q : "current location.";

      toast.info("Fetching weather for " + message);

      await getFormattedWeatherData({ ...query, units }).then((data) => {
        toast.success(
          `Successfully fetched weather for ${data.name}, ${data.country}.`
        );

        setWeather(data);
      });
    };

    fetchWeather();
  }, [query, units]);

  useEffect(() => {
    if (query.q) {
      localStorage.setItem("lastSearchedCity", query.q);
    }
  }, [query]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-700 to-blue-700";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "from-cyan-700 to-blue-700";

    return "from-yellow-700 to-orange-700";
  };

  return (
    <div
      className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}
    >
      <Search setQuery={setQuery} units={units} setUnits={setUnits} />
      {weather ? <WeatherDisplay weather={weather} /> : "Loading..."}
      <Favorite setQuery={setQuery} />
      <ToastContainer autoClose={5000} theme="colored" newestOnTop={true} />
    </div>
  );
}

export default App;
