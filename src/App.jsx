


APP.JSXimport React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [city, setCity] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);

  const BACKEND_URL = 'https://kosher-click.onrender.com';

  const handleSearch = async () => {
    if (!city) return alert('אנא הזן עיר');

    setLoading(true);
    try {
      const res = await axios.post(
        `${BACKEND_URL}/restaurants/load-restaurants`,
        { city }
      );
      setRestaurants(res.data);
    } catch (err) {
      console.error(err);
      alert('שגיאה בטעינת מסעדות');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 rtl" dir="rtl">
      <div className="max-w-6xl mx-auto text-center">

        <h1 className="text-5xl font-extrabold mb-8 text-yellow-500">
          Kosher Click
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="flex flex-col md:flex-row gap-4 justify-center mb-12"
        >
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="באיזו עיר תרצה לאכול?"
            className="px-6 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white w-full md:w-96 text-right"
          />

          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-yellow-500 text-black font-bold rounded-lg"
          >
            {loading ? 'מחפש...' : 'מצא אוכל כשר'}
          </button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {restaurants.map((r) => (
            <div
              key={r.placeId}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg"
            >
              <div className="h-48 relative bg-gray-700">
                <img
                  src={
                    r.photoReference
                      ? `${BACKEND_URL}/restaurants/photo/${r.photoReference}`
                      : 'https://via.placeholder.com/400x200?text=No+Image'
                  }
                  alt={r.name}
                  className="w-full h-full object-cover"
                />

                <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded text-yellow-400">
                  ⭐ {r.rating}
                </div>
              </div>

              <div className="p-6 text-right">
                <h3 className="text-2xl font-bold mb-2">{r.name}</h3>
                <p className="text-gray-400 mb-4">{r.address}</p>

                <button
                  onClick={() =>
                    window.open(
                      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        r.name + ' ' + r.address
                      )}`,
                      '_blank'
                    )
                  }
                  className="w-full py-2 bg-blue-600 rounded-lg font-bold"
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

