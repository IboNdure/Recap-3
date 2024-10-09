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

  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm addColor={addColor} />
      <div className="color-grid">
        {colors.map((color) => (
          <Color key={color.id} color={color} />
        ))}
      </div>
    </>
  );
}

export default App;
