import { useState } from "react"
import fetchWeather from "../services/weatherApi";

function SearchForm() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)

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
      <div>
        <input
          type="text"
          value={city}
          placeholder="Enter a city to start"
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {loading ? (
          <p>Loading...</p>
        ) : weather ? (
          <div>
            <h2>{weather.name}</h2>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p>{weather.main.temp} °C</p>
            <p>{weather.weather[0].description}</p>
          </div>
        ) : (
          <p>Enter a city to search for weather</p>
        )}
      </div>
    );
};

export default SearchForm;