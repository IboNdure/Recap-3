import ColorForm from "./Components/ColorForm";
import Color from "./Components/Color/Color";
import { initialColors } from "./lib/colors";
import "./App.css";
import useLocalStorageState from "use-local-storage-state";

function App() {
  const [colors, setColors] = useLocalStorageState("colors", {
    defaultValue: initialColors,
  });

  // Add new color
  const addColor = (newColor) => {
    setColors([newColor, ...colors]);
  };

  // Delete color
  const deleteColor = (id) => {
    const updatedColors = colors.filter((color) => color.id !== id);
    setColors(updatedColors);

    if (updatedColors.length === 0) {
      alert("No colors left! Please add new colors.");
    }
  };

  // Update color
  const updateColor = (updatedColor) => {
    const updatedColors = colors.map((color) =>
      color.id === updatedColor.id ? updatedColor : color
    );
    setColors(updatedColors);
  };

  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm addColor={addColor} />
      <div className="color-grid">
        {colors.map((color) => (
          <Color
            key={color.id}
            color={color}
            deleteColor={deleteColor}
            updateColor={updateColor} // Pass the update function down
          />
        ))}
      </div>
    </>
  );
}

export default App;
