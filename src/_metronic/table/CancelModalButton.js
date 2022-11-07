import React from "react";

function CancelModalButton({ setShowModal }) {
  return (
    <button
      type="button"
      onClick={() => setShowModal(false)}
      className="btn btn-light btn-elevate"
    >
      Cancel
    </button>
  );
}

export default CancelModalButton;
