import React, { useEffect, useState } from "react";

import WeatherCard from "./components/WeatherCard";

function App() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("");

  const [currentdata, setCurrentData] = useState(null);
  const [currentLocation, setCurrentLocation] = useState("Dhaka");
  // const API_KEY=process.env.API_KEY;

  if ("Geolocation" in navigator) {
    const locationnn = navigator.geolocation.getCurrentPosition();
    console.log(locationnn);
  }
  const searchURL = `http://api.weatherapi.com/v1/current.json?key=b763089d5aaf402dbda184822232707&q=${location}`;

  useEffect(() => {
    const currentLocationURL = `http://api.weatherapi.com/v1/current.json?key=b763089d5aaf402dbda184822232707&q=${currentLocation}`;
    fetch(currentLocationURL)
      .then((res) => res.json())
      .then((response) => {
        const firstWord = response.current.condition.text.split(" ")[0];
        const currentWeatherData = {
          name: "Current Location : " + response.location.name,
          temp: response.current.temp_c,
          desc: `${firstWord}`,
          feels_like: response.current.feelslike_c,
          humidity: response.current.humidity,
          wind_speed: response.current.wind_kph,
          country: response.location.country,
          iconSrc: response.current.condition.icon,
        };
        setCurrentData(currentWeatherData);
      });
  });

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      fetch(searchURL)
        .then((res) => res.json())
        .then((response) => {
          const firstWord = response.current.condition.text.split(" ")[0];
          const weatherData = {
            name: "Searched City : " + response.location.name,
            temp: response.current.temp_c,
            desc: `${firstWord}`,
            feels_like: response.current.feelslike_c,
            humidity: response.current.humidity,
            wind_speed: response.current.wind_kph,
            country: response.location.country,
            iconSrc: response.current.condition.icon,
          };
          setData(weatherData);
        });
      setLocation("");
    }
  };

  return (
    <div className="App">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder="Enter Location..."
          type="text"
        />
      </div>
      <div className="container">
        {currentdata && <WeatherCard weatherData={currentdata} />}
        {data && <WeatherCard weatherData={data} />}
      </div>
    </div>
  );
}

export default App;
