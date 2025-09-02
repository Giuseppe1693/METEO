import { useState } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (city.trim()) {
      navigate(`/weather/${city}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-blue-200">
      <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-8 drop-shadow-lg">Controlla il meteo</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Inserisci la città"
        className=" bg-blue-200 w-64 md:w-80 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 shadow"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all shadow-lg"
      >
        Cerca
      </button>
    </div>
  );
}

export default HomePage;
