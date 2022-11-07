import React from "react";
import { Spinner } from "react-bootstrap";

function SaveButton({ handleSubmit, loading }) {
  return (
    <button
      type="submit"
      onClick={() => handleSubmit()}
      className="btn btn-primary btn-elevate"
      disabled={loading}
    >
      Save{" "}
      {loading && (
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      )}
    </button>
  );
}

export default SaveButton;
