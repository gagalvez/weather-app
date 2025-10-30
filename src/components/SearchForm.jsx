import { useState } from "react";
import fetchWeather from "../services/weatherApi";

function SearchForm() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSearch() {
    if (!city || !city.trim()) {
      setError("Enter a city to search...");
      return;
    }

    try {
      setError(null);
      setLoading(true);
      const result = await fetchWeather(city);
      setWeather(result);
    } catch {
      setError("City not found");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-100 via-blue-200 to-blue-400">
      <div className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-sky-700 mb-6">🌤️ Weather App</h1>

        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            value={city}
            placeholder="Enter a city..."
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 p-2 rounded-lg border border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sky-800"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition-colors"
          >
            Search
          </button>
        </div>

        {error && <p className="text-red-600 font-medium mb-2">{error}</p>}

        {loading ? (
          <p className="text-sky-700 font-semibold">Loading...</p>
        ) : weather ? (
          <div className="mt-6">
            <h2 className="text-2xl font-bold text-sky-800">{weather.name}</h2>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
              alt={weather.weather[0].description}
              className="mx-auto"
            />
            <p className="capitalize text-lg text-gray-700">
              {weather.weather[0].description}
            </p>
            <p className="text-3xl font-semibold text-sky-900">
              {weather.main.temp} °C
            </p>
            <div className="mt-4 space-y-1 text-gray-600">
              <p>💧 Humidity: {weather.main.humidity}%</p>
              <p>💨 Wind: {weather.wind.speed} m/s</p>
              <p>🥶 Feels like: {weather.main.feels_like} °C</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-600">Enter a city to search for weather</p>
        )}
      </div>
    </div>
  );
}

export default SearchForm;
