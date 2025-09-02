function WeatherCard({ day }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-lg flex flex-col items-center gap-2 hover:scale-105 transition-transform relative group">
      {day.icon && (
        <img src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`} alt={day.description} className="w-16 h-16" />
      )}
      <p className="font-bold">{day.date}</p>
      <p>🌡️ {day.temp}°C</p>
      <p>☁️ {day.description}</p>

      {/* Tooltip dettagli */}
      <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col bg-blue-100 dark:bg-gray-800 text-gray-800 dark:text-white p-2 rounded shadow-lg text-sm w-40 text-center">
        <p>
          🌡️ Min: {day.temp_min}°C / Max: {day.temp_max}°C
        </p>
        <p>💧 Umidità: {day.humidity}%</p>
        <p>💨 Vento: {day.wind} m/s</p>
        <p>{day.rain ? "🌧️ Piove" : "☀️ Non piove"}</p>
      </div>
    </div>
  );
}

export default WeatherCard;
