import BottomCard from "./BottomCard";
import CityWeather from "./CityWeather";

export default function WeatherCard({ weatherData }) {
  return (
    <div>
      <CityWeather
        name={weatherData.name}
        temp={weatherData.temp.toFixed()}
        desc={weatherData.desc}
        country={weatherData.country}
        icon={weatherData.iconSrc}
      />
      <BottomCard
        feels_like={weatherData.feels_like.toFixed()}
        humidity={weatherData.humidity.toFixed()}
        wind_speed={weatherData.wind_speed.toFixed()}
      />
    </div>
  );
}
