import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentWeather, getForecast } from "../services/api";
import Loader from "../components/Loader";

export default function WeatherDetail() {
  const { city } = useParams();
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const currentData = await getCurrentWeather(city);
        const forecastData = await getForecast(city);

        if (!currentData || !forecastData) {
          setError("Errore nel recupero dei dati. Controlla la città o la chiave API.");
        } else {
          setCurrent(currentData);
          setForecast(forecastData);
        }
      } catch (err) {
        setError(err.message || "Errore sconosciuto.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [city]);

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 text-red-700">
        <h1 className="text-2xl font-bold mb-4">Errore</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-blue-100 to-blue-300 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center">{city.toUpperCase()}</h1>

      {current && (
        <div className="mb-6 bg-white p-6 rounded-xl shadow-lg flex flex-col md:flex-row items-center gap-6">
          {current.icon && (
            <img src={`https://openweathermap.org/img/wn/${current.icon}@2x.png`} alt={current.description} />
          )}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold mb-2">Meteo attuale</h2>
            <p className="text-lg">🌡️ Temperatura: {current.temp}°C</p>
            <p className="text-lg">☁️ Condizioni: {current.description}</p>
            <p className="text-lg">{current.rain ? "🌧️ Piove" : "☀️ Non piove"}</p>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-semibold mb-4 text-center">Previsioni prossimi 5 giorni</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {forecast.map((day, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-xl shadow-lg flex flex-col items-center gap-2 hover:scale-105 transition-transform"
          >
            {day.icon && <img src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`} alt={day.description} />}
            <p className="font-bold">{day.date}</p>
            <p>🌡️ {day.temp}°C</p>
            <p>☁️ {day.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
