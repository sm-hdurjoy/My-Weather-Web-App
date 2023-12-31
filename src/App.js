import React, { useEffect, useState } from "react";
import WeatherCard from "./components/WeatherCard";
// import dotenv from "dotenv";
// dotenv.config();

function App() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("");
  const [currentdata, setCurrentData] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const weatherAPI = "b763089d5aaf402dbda184822232707";
  const locationAPI = "57cb9e36ef1f4e138e27124523b3c810";

  let latitude;
  let longitude;

  useEffect(() => {
    const success = (position) => {
      // console.log(position);
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      console.log(latitude);
      console.log(longitude);
      const locationURL = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${locationAPI}`;

      // fetching location according to latitude and longitude
      fetch(locationURL)
        .then((res) => res.json())
        .then((locationDecode) => {
          // console.log(locationDecode);
          setCurrentLocation(locationDecode.features[0].properties.city);
        });
    };

    const error = () => {
      console.log("Unable to get location");
    };

    navigator.geolocation.getCurrentPosition(success, error);
  }, [latitude, longitude]);

  const searchURL = `http://api.weatherapi.com/v1/current.json?key=${weatherAPI}&q=${location}`;

  useEffect(() => {
    const currentLocationURL = `http://api.weatherapi.com/v1/current.json?key=${weatherAPI}&q=${currentLocation}`;
    console.log("currentlocation call");
    // Fetching current detected location's weather data
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
  }, [currentLocation]);

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      console.log("search city call");
      // Fetching searched city weather data
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
