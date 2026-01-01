import { useState } from "react";
import axios from "axios";

function App() {
  const [location, setLocation] = useState("");
  const [restaurants, setRestaurants] = useState([]);

  const searchRestaurants = async () => {
    try {
      const res = await axios.post("http://localhost:5000/restaurants/load-restaurants", { location });
      setRestaurants(res.data.results);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="הכנס עיר" />
      <button onClick={searchRestaurants}>חפש</button>

      {restaurants.map((r) => (
        <div key={r.place_id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <h3>{r.name}</h3>
          <p>{r.address}</p>
          {r.photos.length > 0 && <img src={`http://localhost:5000${r.photos[0].url}`} alt={r.name} />}
        </div>
      ))}
    </div>
  );
}

export default App;
