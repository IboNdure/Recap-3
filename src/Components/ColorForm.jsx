import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import ColorInput from "./Color/ColorInput";

const ColorForm = ({ addColor, initialValues = {}, isEditing = false }) => {
  const [role, setRole] = useState(initialValues.role || "");
  const [hex, setHex] = useState(initialValues.hex || "#FFFFFF");
  const [contrastText, setContrastText] = useState(
    initialValues.contrastText || "#FFFFFF"
  );

  useEffect(() => {
    if (isEditing) {
      setRole(initialValues.role);
      setHex(initialValues.hex);
      setContrastText(initialValues.contrastText);
    }
  }, [initialValues, isEditing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newColor = {
      id: initialValues.id || nanoid(), // Use existing ID if editing
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
          <legend>Role:</legend>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </label>

        <label>
          <legend>Hex Value:</legend>
          <ColorInput value={hex} onChange={setHex} />
        </label>

        <label>
          <legend>Contrast Text:</legend>
          <ColorInput value={contrastText} onChange={setContrastText} />
        </label>

        <button type="submit">
          {isEditing ? "Update Color" : "Add Color"}
        </button>
      </form>
    </fieldset>
  );
};

export default ColorForm;
