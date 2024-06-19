import React, { useState, useEffect } from "react";
import {
  getFavorites,
  addFavorite,
  deleteFavorite,
} from "../services/FavoriteService";
import getFormattedWeatherData from "../services/WeatherService"; // Import getFormattedWeatherData function

const Favorite = ({ setQuery, setWeather }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    const favoriteCities = await getFavorites();
    setFavorites(favoriteCities);
  };

  const handleAddFavorite = async (cityName) => {
    if (!cityName) return;
    const weather = await getFormattedWeatherData({
      q: cityName,
      units: "metric",
    });
    await addFavorite({
      id: weather.name,
      city: weather.name,
      country: weather.country,
    });
    fetchFavorites();
    document.getElementById("cityInput").value = ""; // Clear input
  };

  const handleDeleteFavorite = async (id) => {
    await deleteFavorite(id);
    fetchFavorites();
  };

  const handleCityClick = async (cityName) => {
    setQuery({ q: cityName });
  };

  return (
    <div className="mt-4 p-4 bg-white bg-opacity-10 rounded-lg">
      <div className="flex justify-center mb-4">
        <input
          type="text"
          id="cityInput"
          placeholder="Add city to favorites"
          className="p-2 text-lg rounded-lg border border-gray-300"
        />
        <button
          onClick={() =>
            handleAddFavorite(document.getElementById("cityInput").value)
          }
          className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Add Favorite
        </button>
      </div>
      <div className="flex flex-wrap justify-center items-center">
        {favorites.map((fav) => (
          <div
            key={fav.id}
            className="bg-white bg-opacity-20 rounded-lg p-2 m-2 max-w-xs cursor-pointer"
            onClick={() => handleCityClick(fav.city)}
          >
            <h3 className="text-xl mb-1 truncate">{fav.city}</h3>
            <p className="text-sm">{fav.country}</p>
            <button
              onClick={() => handleDeleteFavorite(fav.id)}
              className="mt-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition duration-300"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorite;
