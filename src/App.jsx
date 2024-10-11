import { useState } from "react";
import ColorForm from "./Components/ColorForm";
import Color from "./Components/Color/Color";
import NewThemeForm from "./Components/NewThemeForm";
import { initialThemes } from "./lib/colors";
import "./App.css";
import useLocalStorageState from "use-local-storage-state";
import { nanoid } from "nanoid";

function App() {
  const [themes, setThemes] = useLocalStorageState("themes", {
    defaultValue: initialThemes,
  });

  const [activeThemeId, setActiveThemeId] = useState(themes[0].id);

  const activeTheme = themes.find((theme) => theme.id === activeThemeId);

  // Add a new color to the active theme
  const addColor = (newColor) => {
    const updatedThemes = themes.map((theme) => {
      if (theme.id === activeThemeId) {
        return { ...theme, colors: [newColor, ...theme.colors] };
      }
      return theme;
    });
    setThemes(updatedThemes);
  };

  // Delete a color from the active theme
  const deleteColor = (id) => {
    const updatedThemes = themes.map((theme) => {
      if (theme.id === activeThemeId) {
        const updatedColors = theme.colors.filter((color) => color.id !== id);
        return { ...theme, colors: updatedColors };
      }
      return theme;
    });
    setThemes(updatedThemes);

    if (activeTheme.colors.length === 0) {
      alert("No colors left! Please add new colors.");
    }
  };

  // Update a color in the active theme
  const updateColor = (updatedColor) => {
    const updatedThemes = themes.map((theme) => {
      if (theme.id === activeThemeId) {
        const updatedColors = theme.colors.map((color) =>
          color.id === updatedColor.id ? updatedColor : color
        );
        return { ...theme, colors: updatedColors };
      }
      return theme;
    });
    setThemes(updatedThemes);
  };

  // Add a new theme
  const addTheme = (themeName) => {
    const newTheme = {
      id: nanoid(), // Generate a unique ID for the new theme
      name: themeName,
      colors: [],
    };
    setThemes([...themes, newTheme]);
  };

  // Delete a theme
  const deleteTheme = (themeId) => {
    if (themeId === "t1") {
      alert("The Default Theme cannot be deleted.");
      return;
    }
    const updatedThemes = themes.filter((theme) => theme.id !== themeId);
    setThemes(updatedThemes);
    setActiveThemeId(updatedThemes[0]?.id || ""); // Switch to another theme if the current one is deleted
  };

  // Handle theme switching
  const handleThemeChange = (event) => {
    setActiveThemeId(event.target.value);
  };

  return (
    <>
      <h1>Theme Creator</h1>

      {/* New Theme Form */}
      <NewThemeForm addTheme={addTheme} />

      {/* Dropdown to select the active theme */}
      <select onChange={handleThemeChange} value={activeThemeId}>
        {themes.map((theme) => (
          <option key={theme.id} value={theme.id}>
            {theme.name}
          </option>
        ))}
      </select>

      {/* Button to delete the selected theme */}
      <button onClick={() => deleteTheme(activeThemeId)}>Delete Theme</button>

      {/* Add new color form */}
      <ColorForm addColor={addColor} />

      {/* Display the colors in the active theme */}
      <div className="color-grid">
        {activeTheme.colors.map((color) => (
          <Color
            key={color.id}
            color={color}
            deleteColor={deleteColor}
            updateColor={updateColor}
          />
        ))}
      </div>
    </>
  );
}

export default App;
