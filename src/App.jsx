import SearchForm from "./components/SearchForm"
import fetchWeather from "./services/weatherApi"

export default function App() {

  fetchWeather();
  return (
    <SearchForm />
  )
};

