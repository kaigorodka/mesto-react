import React from "react";
function SaveButton({ buttonText }) {
  return (
    <button className="popup__save-button" type="submit">
      {buttonText}
    </button>
  );
}
export default SaveButton;
