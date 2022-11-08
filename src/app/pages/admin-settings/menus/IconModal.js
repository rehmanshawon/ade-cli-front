import React from "react";
import { Modal } from "react-bootstrap";
import { icons } from "../../../../data/fontAwesome";

const IconModal = ({ showDetails, setShowDetails, setSelected, selected }) => {
  return (
    <Modal
      show={showDetails}
      onHide={() => {
        setShowDetails(false);
      }}
      size="md"
      aria-labelledby="example-modal-sizes-title-lg"
      centered={false}
    >
      {/* Base Products */}
      <div className="card card-custom">
        <div className="card-header border-0 py-5 d-flex justify-content-between">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label font-weight-bolder text-dark d-block">
              Font Awesome Icons
            </span>
          </h3>
        </div>
      </div>

      <Modal.Body>
        <div style={{ height: "500px", overflowY: "auto" }} className="row">
          {icons &&
            icons.length > 0 &&
            icons.map((item, i) => (
              <div className="col-md-2 mb-2" key={i}>
                <button
                  className={
                    selected == item ? "btn btn-primary" : "btn btn-default"
                  }
                  type="button"
                  onClick={() => {
                    setSelected(item);
                    setShowDetails(false);
                  }}
                >
                  <i className={item}></i>
                </button>
              </div>
            ))}
        </div>
      </Modal.Body>

      <Modal.Footer className="border-0">
        <div>
          <button
            type="button"
            onClick={() => {
              setShowDetails(false);
              setSelected("");
            }}
            className="btn btn-primary btn-elevate"
          >
            Cancel
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default IconModal;
