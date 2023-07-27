export default function BottomCard({ feels_like, humidity, wind_speed }) {
  return (
    <div className="bottom">
      <div className="feels">
        {feels_like && <p className="bold">{feels_like}°C</p>}
        <p>Feels Like</p>
      </div>
      <div className="humidity">
        {humidity && <p className="bold">{humidity}%</p>}
        <p>Humidity</p>
      </div>
      <div className="wind">
        {wind_speed && <p className="bold">{wind_speed} MPH</p>}
        <p>Wind Speed</p>
      </div>
    </div>
  );
}
