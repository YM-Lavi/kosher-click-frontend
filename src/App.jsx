import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RestaurantsList = ({ location }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!location || location.trim() === '') return;

    const fetchRestaurants = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.post('https://kosher-click.onrender.com/restaurants/load-restaurants', {
          location,
        });

        // ודא שתמיד מערך
        setRestaurants(Array.isArray(response.data.results) ? response.data.results : []);
      } catch (err) {
        console.error(err);
        setError('שגיאה בטעינת המסעדות');
        setRestaurants([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [location]);

  if (loading) return <p>טוען מסעדות...</p>;
  if (error) return <p>{error}</p>;
  if (restaurants.length === 0) return <p>לא נמצאו מסעדות באזור זה</p>;

  return (
    <div>
      {restaurants.map(r => (
        <div key={r.placeId} style={{ borderBottom: '1px solid #ddd', padding: '10px 0' }}>
          <h3>{r.name}</h3>
          <p>{r.address}</p>
          <p>דירוג: {r.rating} ({r.user_ratings_total} חוות דעת)</p>
        </div>
      ))}
    </div>
  );
};

export default RestaurantsList;
