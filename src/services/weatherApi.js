async function fetchWeather(city) {
    if (!city || !city.trim()) {
        throw new Error("City name is empty")
    };

    const q = encodeURIComponent(city.trim());
    const API_KEY = "f90d3626af6813edae083f309ea1de92";
    const url =
      `https://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${API_KEY}&units=metric`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.error(error.message);
    }

};

export default fetchWeather;