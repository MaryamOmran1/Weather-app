import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_KEY = "cbbe04b35fb21222d45141cd606f35a2"; // Replace with your OpenWeatherMap API key

const App = () => {
  const [city, setCity] = useState("London");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [city]);

  const handleSearch = (event) => {
    event.preventDefault();
    fetchWeather();
  };

  return (
    <div className="App container">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <button type="submit">Search</button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {weather && (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <strong>Temperature:</strong> {weather.main.temp}°C
          <br />
          <strong>Humidity:</strong> {weather.main.humidity}%<br />
          <strong>Wind Speed:</strong> {weather.wind.speed} m/s
        </div>
      )}
    </div>
  );
};

export default App;
