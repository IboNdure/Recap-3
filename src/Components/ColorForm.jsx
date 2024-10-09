import { useState } from "react";
import { uid } from "uid";
import ColorInput from "./ColorInput";

export default function ColorForm({ addColor }) {
  const [role, setRole] = useState("primary main");
  const [hex, setHex] = useState("#ff4a11");
  const [contrastText, setContrastText] = useState("#FFFFFF");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newColor = {
      id: uid(),
      role,
      hex,
      contrastText,
    };
    addColor(newColor);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Role</label>
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
      </div>

      <ColorInput label="Hex" value={hex} onChange={setHex} />
      <ColorInput
        label="Contrast Text"
        value={contrastText}
        onChange={setContrastText}
      />

      <button type="submit">Add Color</button>
    </form>
  );
}
