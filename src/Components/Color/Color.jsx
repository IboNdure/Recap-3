import { useState } from "react";
import "./Color.css";
import ColorForm from "../ColorForm";
import CopyClipboard from "../CopyToClipboard";

export default function Color({ color, deleteColor, updateColor }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // Handle enabling the edit mode
  const handleEdit = () => {
    setEditMode(true);
  };

  // Handle update and exit edit mode after saving
  const handleUpdate = (updatedColor) => {
    updateColor(updatedColor); // Call parent to update the color
    setEditMode(false); // Exit edit mode after update
  };

  // Handle delete confirmation
  const handleDelete = () => {
    setShowConfirm(true); // Show confirmation dialog
  };

  // Confirm deletion and close confirmation dialog
  const confirmDelete = () => {
    deleteColor(color.id);
    setShowConfirm(false);
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
          addColor={handleUpdate} // Use the form to update color
          initialValues={color} // Pass current color data
          isEditing={true} // Indicate that it's an edit operation
        />
      ) : (
        <>
          <h3 className="color-card-headline">{color.hex}</h3>
          <h4>{color.role}</h4> <CopyClipboard text={color.hex} />
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
