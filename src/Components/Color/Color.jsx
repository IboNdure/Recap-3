import { useState } from "react";
import "./Color.css";
import ColorForm from "../ColorForm";

export default function Color({ color, deleteColor, updateColor }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const handleEdit = () => {
    setEditMode(true); // Enable edit mode
  };

  const handleUpdate = (updatedColor) => {
    updateColor(updatedColor); // Corrected function name and argument
    setEditMode(false); // Exit edit mode after updating
  };

  const handleDelete = () => {
    setShowConfirm(true); // Show confirmation on delete click
  };

  const confirmDelete = () => {
    deleteColor(color.id); // Call the parent function to delete the color
    setShowConfirm(false); // Close the confirmation after deletion
  };

  return (
    <div
      className="color-card"
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      {editMode ? (
        <ColorForm
          addColor={handleUpdate} // Reuse form for updating
          initialValues={color} // Pass current values as initial values
          isEditing={true} // Indicate that this is an edit operation
        />
      ) : (
        <>
          <h3 className="color-card-headline">{color.hex}</h3>
          <h4>{color.role}</h4>
          <p>Contrast: {color.contrastText}</p>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}

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
