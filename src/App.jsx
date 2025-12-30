import React, { useState, useEffect } from 'react';
import axios from 'axios';

// שים כאן את המפתח שלך מגוגל
const GOOGLE_API_KEY = ""; 

function App() {
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // כתובת השרת שלך ב-Render
  const API_URL = "https://kosher-click-backend.onrender.com";

  const handleSearch = async () => {
    if (!city.trim()) {
      alert("אנא הזן שם עיר");
      return;
    }

    setLoading(true);
    setHasSearched(true);
    
    try {
      // פנייה לשרת האמיתי ולא ל-localhost
      const response = await axios.post(`${API_URL}/restaurants/load-restaurants`, { 
        city: city.trim(), 
        street: street.trim() 
      });
      
      setRestaurants(response.data);
    } catch (error) {
      console.error("Search failed:", error);
      alert("שגיאה בחיבור לשרת. וודא שהשרת ב-Render פעיל.");
    } finally {
      setLoading(false);
    }
  };

  const getPhotoUrl = (ref) => {
    if (!ref) return 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800';
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${ref}&key=${GOOGLE_API_KEY}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-right pb-20" dir="rtl">
      {/* Header & Search */}
      <header className="bg-slate-900 text-white py-16 px-4 text-center relative shadow-2xl">
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter">
            כשר<span className="text-emerald-400">-</span>קליק
          </h1>
          <p className="text-xl mb-10 text-slate-400 font-light">חיפוש מסעדות כשרות לפי עיר ורחוב</p>
          
          <div className="bg-white rounded-3xl p-2 shadow-2xl max-w-2xl mx-auto flex flex-col md:flex-row gap-2 border border-slate-700">
            <input 
              type="text" 
              className="flex-1 p-4 text-slate-900 outline-none text-lg bg-transparent border-b md:border-b-0 md:border-l border-slate-100"
              placeholder="עיר (למשל: ירושלים)"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <input 
              type="text" 
              className="flex-1 p-4 text-slate-900 outline-none text-lg bg-transparent"
              placeholder="רחוב (למשל: יפו)"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button 
              onClick={handleSearch}
              disabled={loading}
              className="bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-400 text-white px-10 py-4 rounded-2xl font-bold transition-all transform active:scale-95"
            >
              {loading ? 'מחפש...' : 'מצא אוכל'}
            </button>
          </div>
        </div>
      </header>

      {/* Results Section */}
      <main className="max-w-7xl mx-auto px-6 mt-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white h-[400px] rounded-3xl animate-pulse shadow-sm border border-slate-200"></div>
            ))}
          </div>
        ) : restaurants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {restaurants.map((res, index) => (
              <div key={index} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group border border-slate-100 flex flex-col">
                <div className="h-56 relative overflow-hidden bg-slate-200">
                  <img 
                    src={getPhotoUrl(res.photoReference)} 
                    alt={res.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500'; }}
                  />
                  <div className="absolute top-4 left-4 bg-white/95 px-3 py-1.5 rounded-2xl text-sm font-black text-slate-900 shadow-md">
                    ⭐ {res.rating || 'N/A'}
                  </div>
                </div>
                <div className="p-6 flex-grow">
                  <h3 className="text-2xl font-bold mb-2 text-slate-800 line-clamp-1">{res.name}</h3>
                  <p className="text-slate-500 text-sm mb-6 min-h-[40px]">📍 {res.address}</p>
                  <div className="flex items-center justify-between border-t pt-5">
                    <span className="text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-lg text-xs">פתוח וכשר</span>
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(res.name + " " + res.address)}`}
                      target="_blank" 
                      rel="noreferrer"
                      className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-emerald-500 transition-colors"
                    >
                      נווט למקום
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : hasSearched && !loading ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🤔</div>
            <h2 className="text-2xl font-bold text-slate-600">לא מצאנו תוצאות לחיפוש הזה</h2>
            <p className="text-slate-400 mt-2">נסו לבדוק את איות העיר או הרחוב</p>
          </div>
        ) : (
          <div className="text-center py-20 opacity-30">
            <h2 className="text-2xl font-medium italic">הזינו עיר ורחוב כדי להתחיל...</h2>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
