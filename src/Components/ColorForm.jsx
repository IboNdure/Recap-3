import { useState } from "react";
import { nanoid } from "nanoid"; // Use nanoid for generating unique ids
import ColorInput from "./Color/ColorInput";
const ColorForm = ({ addColor }) => {
  const [role, setRole] = useState("new role");
  const [hex, setHex] = useState("#000000");
  const [contrastText, setContrastText] = useState("#FFFFFF");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newColor = {
      id: nanoid(),
      role,
      hex,
      contrastText,
    };
    addColor(newColor);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Role:
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
      </label>

      <label>
        Hex Value:
        <ColorInput value={hex} onChange={setHex} />
      </label>

      <label>
        Contrast Text:
        <ColorInput value={contrastText} onChange={setContrastText} />
      </label>

      <button type="submit">Add Color</button>
    </form>
  );
};

export default ColorForm;
