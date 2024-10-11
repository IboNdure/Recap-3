import { useState } from "react";

function NewThemeForm({ addTheme }) {
  const [themeName, setThemeName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTheme(themeName);
    setThemeName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={themeName}
        onChange={(e) => setThemeName(e.target.value)}
        placeholder="Theme Name"
        required
      />
      <button type="submit">Add Theme</button>
    </form>
  );
}

export default NewThemeForm;
