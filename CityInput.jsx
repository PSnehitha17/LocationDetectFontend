import React, { useState } from 'react';

export default function CityInput({ cities, setCities }) {
  const [input, setInput] = useState('');
  const addCity = () => {
    const trimmed = input.trim();
    if (trimmed && !cities.includes(trimmed)) {
      setCities([...cities, trimmed]);
      setInput('');
    }
  };
  const removeCity = (city) => {
    setCities(cities.filter(c => c !== city));
  };
  return (
    <div>
      <label className="block font-semibold mb-1">Enter City Names:</label>
      <div className="flex gap-2 mb-2">
        <input type="text" className="border rounded px-3 py-1 flex-grow" placeholder="Type city and press Add" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addCity(); }}} />
        <button onClick={addCity} className="bg-green-600 text-white px-3 rounded hover:bg-green-700">Add</button>
      </div>
      <div className="flex flex-wrap gap-2">
        {cities.map(city => (
          <div key={city} className="bg-blue-200 text-blue-800 px-3 py-1 rounded cursor-pointer select-none" onClick={() => removeCity(city)} title="Click to remove">{city} ×</div>
        ))}
      </div>
    </div>
  );
}