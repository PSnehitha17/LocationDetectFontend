import React from 'react';

export default function CategorySelect({ category, setCategory, options }) {
  return (
    <div>
      <label className="block font-semibold mb-1">Select Category:</label>
      <select className="border rounded px-3 py-2 w-full" value={category} onChange={e => setCategory(e.target.value)}>
        <option value="">-- Select --</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}