import React from 'react';

export default function PlaceDetails({ details }) {
  if (!details) {
    return <div className="w-1/2 p-3 border rounded bg-white shadow text-center text-gray-500">Select a place to see details</div>;
  }
  const { name, formatted_address, formatted_phone_number, website, opening_hours, rating, geometry } = details;
  return (
    <div className="w-1/2 p-3 border rounded bg-white shadow overflow-auto max-h-[500px]">
      <h2 className="text-xl font-bold mb-2">{name}</h2>
      <p><strong>Address:</strong> {formatted_address}</p>
      {formatted_phone_number && <p><strong>Phone:</strong> {formatted_phone_number}</p>}
      {website && <p><strong>Website: </strong><a href={website} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{website}</a></p>}
      <p><strong>Rating:</strong> {rating || 'N/A'}</p>
      {opening_hours?.weekday_text && (
        <div>
          <strong>Opening Hours:</strong>
          <ul className="list-disc ml-5">{opening_hours.weekday_text.map(day => <li key={day}>{day}</li>)}</ul>
        </div>
      )}
      {geometry?.location && (
        <div className="mt-4">
          <iframe title="place-map" width="100%" height="250" frameBorder="0" style={{ border: 0 }}
            src={\`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_API_KEY&q=\${geometry.location.lat},\${geometry.location.lng}\`} allowFullScreen></iframe>
          <p className="text-xs mt-1 text-gray-500">Map powered by Google Maps</p>
        </div>
      )}
    </div>
  );
}