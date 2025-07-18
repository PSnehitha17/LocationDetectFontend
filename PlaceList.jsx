import React from 'react';

export default function PlaceList({ places, onSelect, selectedPlaceId }) {
  return (
    <div className="w-1/2 max-h-[500px] overflow-y-auto border p-3 rounded bg-white shadow">
      <h2 className="font-semibold mb-3">Places Found:</h2>
      {places.map(place => (
        <div key={place.place_id} className={\`p-2 cursor-pointer rounded mb-1 \${selectedPlaceId === place.place_id ? 'bg-blue-100' : 'hover:bg-gray-100'}\`} onClick={() => onSelect(place.place_id)}>
          <div className="font-semibold">{place.name}</div>
          <div className="text-sm text-gray-600">{place.address}</div>
          <div className="text-sm text-yellow-600">Rating: {place.rating}</div>
        </div>
      ))}
    </div>
  );
}