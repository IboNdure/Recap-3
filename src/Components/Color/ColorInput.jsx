const ColorInput = ({ value, onChange }) => {
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default ColorInput;
