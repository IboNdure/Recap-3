import { useState } from "react";
import { nanoid } from "nanoid"; // Use nanoid for generating unique ids
import ColorInput from "./Color/ColorInput";
const ColorForm = ({ addColor }) => {
  const [role, setRole] = useState("");
  const [hex, setHex] = useState("#FFFFFF");
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
    setRole("");
    setHex("#FFFFFF");
    setContrastText("#FFFFFF");
  };

  return (
    <fieldset>
      <form onSubmit={handleSubmit}>
        <label>
          <legend> Role:</legend>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </label>

        <label>
          <legend> Hex Value:</legend>
          <ColorInput value={hex} onChange={setHex} />
        </label>

        <label>
          <legend> Contrast Text:</legend>
          <ColorInput value={contrastText} onChange={setContrastText} />
        </label>

        <button type="submit">Add Color</button>
      </form>
    </fieldset>
  );
};

export default ColorForm;
