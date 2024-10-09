import React from "react";

export default function ColorInput({ label, value, onChange }) {
  const handleTextInput = (e) => onChange(e.target.value);
  const handleColorInput = (e) => onChange(e.target.value);

  return (
    <div>
      <label>{label}</label>
      <input type="text" value={value} onChange={handleTextInput} />
      <input type="color" value={value} onChange={handleColorInput} />
    </div>
  );
}
