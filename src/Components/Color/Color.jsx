import { useState } from "react";
import "./Color.css";

export default function Color({ color, deleteColor }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    setShowConfirm(true); // Show confirmation on delete click
  };

  const confirmDelete = () => {
    deleteColor(color.id); // Call the parent function to delete the color
  };

  return (
    <div
      className="color-card"
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      <h3 className="color-card-headline">{color.hex}</h3>
      <h4>{color.role}</h4>
      <p>Contrast: {color.contrastText}</p>

      <button onClick={handleDelete}>Delete</button>

      {showConfirm && (
        <div className="color-card-highlight">
          <p>Are you sure you want to delete this color?</p>
          <button onClick={confirmDelete}>Yes</button>
          <button onClick={() => setShowConfirm(false)}>No</button>
        </div>
      )}
    </div>
  );
}
