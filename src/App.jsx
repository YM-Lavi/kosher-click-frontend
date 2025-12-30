import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [city, setCity] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);

  const BACKEND_URL = "https://kosher-click.onrender.com";
  const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

  const handleSearch = async () => {
    if (!city) return alert("אנא הזן עיר");
    setLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/restaurants/load-restaurants`, { city });
      setRestaurants(response.data);
    } catch (error) {
      console.error("Search failed:", error);
      alert("שגיאה בטעינת מסעדות. בדוק את ה-Console");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 rtl" dir="rtl">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold mb-8 text-yellow-500">Kosher Click</h1>
        
        {/* ה-form מתוקן כאן ללא העטיפה המיותרת */}
        <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="flex flex-col md:flex-row gap-4 justify-center mb-12">
          <input
            type="text"
            placeholder="באיזו עיר תרצה לאכול?"
            className="px-6 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full md:w-96 text-right"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? "מחפש..." : "מצא אוכל כשר"}
          </button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {restaurants.map((res) => (
            <div key={res.placeId} className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700 hover:scale-105 transition-transform">
              <div className="h-48 w-full relative bg-gray-700">
                <img
                  src={res.photoReference 
                    ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${res.photoReference}&key=${GOOGLE_API_KEY}`
                    : "https://via.placeholder.com/400x200?text=No+Image"}
                  alt={res.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.log("Image load error for:", res.name);
                    e.target.src = "https://via.placeholder.com/400x200?text=Image+Error";
                  }}
                />
                <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded text-yellow-400 font-bold">
                  ⭐ {res.rating}
                </div>
              </div>
              <div className="p-6 text-right">
                <h3 className="text-2xl font-bold mb-2">{res.name}</h3>
                <p className="text-gray-400 mb-4 h-12 overflow-hidden">{res.address}</p>
                <button 
                  onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(res.name + " " + res.address)}`, '_blank')}
                  className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold transition-colors"
                >
                  ניווט ב-Google Maps
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
