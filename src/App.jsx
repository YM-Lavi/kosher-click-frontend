import { useState } from "react";
import axios from "axios";
import "./App.css"; // ✅ ייבוא CSS

function App() {
  const [location, setLocation] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchRestaurants = async () => {
    if (!location.trim()) {
      setError("אנא הכנס עיר");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "https://kosher-click.onrender.com/restaurants/load-restaurants",
        { location }
      );
      setRestaurants(res.data.results);
    } catch (err) {
      console.error("Axios Error:", err);
      setError("שגיאה בטעינת מסעדות, נסה שוב");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>חפש מסעדות כשרות לפי עיר</h2>
      <input
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="הכנס עיר"
      />
      <button onClick={searchRestaurants}>חפש</button>

      {loading && <p>טוען...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ marginTop: "20px" }}>
        {restaurants.map((r) => (
          <div key={r.place_id} className="restaurant">
            <h3>{r.name}</h3>
            <p>{r.address}</p>
            {r.photos.length > 0 && (
              <img
                src={`https://kosher-click.onrender.com${r.photos[0].url}`}
                alt={r.name}
              />
            )}
            <p>דירוג: {r.rating} ({r.user_ratings_total} חוות דעת)</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
