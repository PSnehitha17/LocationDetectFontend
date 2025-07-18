import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [city, setCity] = useState('');
  const [category, setCategory] = useState('restaurant');
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const fetchPlaces = async () => {
    try {
      const res = await axios.get('/api/places', {
        params: { city, category }
      });
      setPlaces(res.data.places);
      setSelectedPlace(null);
    } catch (err) {
      alert('Error fetching places');
      console.error(err);
    }
  };

  const fetchDetails = async (place_id) => {
    try {
      const res = await axios.get('/api/place-details', {
        params: { place_id }
      });
      setSelectedPlace(res.data.details);
    } catch (err) {
      alert('Error fetching place details');
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Location Discovery App</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter City (e.g. Hyderabad)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full"
        >
          <option value="restaurant">Restaurants</option>
          <option value="shopping_mall">Shopping Malls</option>
          <option value="hotel">Hotels</option>
          <option value="university">Colleges</option>
          <option value="lodging">Hostels</option>
        </select>
        <button
          onClick={fetchPlaces}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {places.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          {places.map((place) => (
            <div
              key={place.place_id}
              className="p-4 border border-gray-200 rounded bg-white shadow cursor-pointer hover:bg-gray-50"
              onClick={() => fetchDetails(place.place_id)}
            >
              <h2 className="text-lg font-semibold">{place.name}</h2>
              <p>{place.address}</p>
              <p>Rating: {place.rating}</p>
            </div>
          ))}
        </div>
      )}

      {selectedPlace && (
        <div className="mt-8 p-4 bg-white border rounded shadow">
          <h2 className="text-xl font-bold mb-2">{selectedPlace.name}</h2>
          <p><strong>Address:</strong> {selectedPlace.formatted_address}</p>
          {selectedPlace.formatted_phone_number && <p><strong>Phone:</strong> {selectedPlace.formatted_phone_number}</p>}
          {selectedPlace.website && <p><strong>Website:</strong> <a href={selectedPlace.website} target="_blank" rel="noopener noreferrer">{selectedPlace.website}</a></p>}
          <p><strong>Rating:</strong> {selectedPlace.rating}</p>
          {selectedPlace.geometry && (
            <iframe
              className="mt-4 w-full h-64 rounded"
              src={`https://www.google.com/maps?q=${selectedPlace.geometry.location.lat},${selectedPlace.geometry.location.lng}&z=15&output=embed`}
              allowFullScreen
            ></iframe>
          )}
        </div>
      )}
    </div>
  );
}

export default App;