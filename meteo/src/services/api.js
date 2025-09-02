const API_KEY = "b89aaf06832e5ea9a5672d7a960b1d20";

export async function getCurrentWeather(city) {
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},IT&appid=${API_KEY}&units=metric`);
  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Errore nel recupero del meteo attuale");

  return {
    temp: data.main.temp,
    temp_min: data.main.temp_min,
    temp_max: data.main.temp_max,
    description: data.weather[0].description,
    rain: data.weather[0].main.toLowerCase() === "rain",
    wind: data.wind.speed,
    humidity: data.main.humidity,
    icon: data.weather[0].icon,
  };
}

export async function getForecast(city) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city},IT&appid=${API_KEY}&units=metric`
  );
  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Errore nel recupero delle previsioni");

  return data.list
    .filter((_, i) => i % 8 === 0) // prende 1 volta al giorno
    .map((d) => ({
      date: d.dt_txt.split(" ")[0],
      temp: d.main.temp,
      temp_min: d.main.temp_min,
      temp_max: d.main.temp_max,
      description: d.weather[0].description,
      rain: d.weather[0].main.toLowerCase() === "rain",
      wind: d.wind.speed,
      humidity: d.main.humidity,
      icon: d.weather[0].icon,
    }));
}
