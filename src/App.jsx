import { useState } from "react";
import ColorForm from "./Components/ColorForm";
import Color from "./Components/Color/Color";
import { initialColors } from "./lib/colors";
import "./App.css";

function App() {
  const [colors, setColors] = useState(initialColors);

  const addColor = (newColor) => {
    setColors([newColor, ...colors]); // Add new color to the top
  };

  const deleteColor = (id) => {
    const updatedColors = colors.filter((color) => color.id !== id);
    setColors(updatedColors);

    if (updatedColors.length == 0) {
      alert("No colors left! Please add new colors.");
    }
  };

  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm addColor={addColor} />
      <div className="color-grid">
        {colors.map((color) => (
          <Color key={color.id} color={color} deleteColor={deleteColor} />
        ))}
      </div>
    </>
  );
}

export default App;
