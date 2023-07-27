export default function CityWeather({ name, temp, desc, country, icon }) {
  return (
    <div className="top">
      <div className="location">
        {name && (
          <p>
            {name},{" " + country}
          </p>
        )}
      </div>
      <div className="temp">
        <img alt="" src={icon} />
        {temp && <h1>{temp}°C</h1>}
      </div>
      <div className="description">{desc && <p>{desc}</p>}</div>
    </div>
  );
}
