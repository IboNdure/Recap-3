import { useState, useEffect } from "react";
import "./Color.css";
import ColorForm from "../ColorForm";
import CopyToClipboard from "../CopyToClipboard";

export default function Color({ color, deleteColor, updateColor }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [a11yScore, setA11yScore] = useState(null); // State to hold the accessibility score
  const [loading, setLoading] = useState(false); // To show loading while fetching the API response

  // Function to fetch contrast ratio
  const checkContrastRatio = async (hex, contrastText) => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://www.aremycolorsaccessible.com/api/are-they",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            colors: [hex, contrastText],
          }),
        }
      );

      const data = await response.json();
      console.log(data);
      if (data) {
        setA11yScore(data.overall); // Set the a11y score if successful
      } else {
        setA11yScore("Error checking contrast");
      }
    } catch (error) {
      console.error("Error fetching contrast ratio:", error);
      setA11yScore("Error fetching contrast");
    }
    setLoading(false);
  };

  // Handle edit mode and update contrast ratio check
  const handleEdit = () => {
    setEditMode(true);
  };

  const handleUpdate = (updatedColor) => {
    updateColor(updatedColor);
    setEditMode(false);
    checkContrastRatio(updatedColor.hex, updatedColor.contrastText); // Check contrast after editing
  };

  const handleDelete = () => {
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    deleteColor(color.id);
    setShowConfirm(false);
  };

  // Call API on mount or when color changes
  useEffect(() => {
    checkContrastRatio(color.hex, color.contrastText); // Check contrast when the component is loaded
  }, [color]);

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
          addColor={handleUpdate}
          initialValues={color}
          isEditing={true}
        />
      ) : (
        <>
          <h3 className="color-card-headline">{color.hex}</h3>
          <h4>{color.role}</h4>
          <p>Contrast: {color.contrastText}</p>

          {/* Add CopyToClipboard Component */}
          <CopyToClipboard text={color.hex} />

          {/* Display the contrast check result */}
          {loading ? (
            <p>Checking accessibility...</p>
          ) : (
            <p>
              {a11yScore
                ? `Accessibility score: ${a11yScore}`
                : "Error checking contrast"}
            </p>
          )}

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
