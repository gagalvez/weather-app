import { useState } from "react"
import fetchWeather from "../services/weatherApi";

function SearchForm() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);

    async function handleSearch() {
        setLoading(true);
        const result = await fetchWeather(city);
        setWeather(result);
        setLoading(false);

    };

    return (
      <div>
        <input
          type="text"
          value={city}
          placeholder="Enter a city to start"
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        {loading ? (
          <p>Loading...</p>
        ) : weather ? (
          <div>
            <h2>{weather.name}</h2>
            <p>{weather.main.temp} °C</p>
          </div>
        ) : (
          <p>Enter a city to search for weather</p>
        )}
      </div>
    );
};

export default SearchForm;