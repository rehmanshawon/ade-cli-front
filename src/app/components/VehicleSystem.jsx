import React from "react";
import { Button, Modal } from "react-bootstrap";

export default function VehicleSystem({
  showModal,
  setShowModal,
  data,
  setDetails,
}) {
  return (
    <Modal
      show={showModal}
      onHide={() => {
        setShowModal(false);
        setDetails("");
      }}
      size="lg"
      aria-labelledby="example-modal-sizes-title-lg"
      centered
    >
      <Modal.Header>
        <h4>Vehicle Info</h4>
      </Modal.Header>
      <Modal.Body className="overlay overlay-block cursor-default">
        <div className="container">
          <div className="row">
            <div className="col-md-3 mb-3">
              <label htmlFor="">Name</label>
              <h6>{data.name}</h6>
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="">Status</label>
              <h6>{data.online}</h6>
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="">Phone</label>
              <h6>{data.device_data.sim_number || ""}</h6>
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="">Registration No</label>
              <h6>{data.device_data.registration_number || ""}</h6>
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="">Model</label>
              <h6>{data.device_data.device_model || ""}</h6>
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="">Plate No</label>
              <h6>{data.device_data.plate_number || ""}</h6>
            </div>
          </div>

          <div className="row">
            <a
              href={`http://maps.google.com/maps?q=${data.device_data.lastValidLatitude},${data.device_data.lastValidLongitude}`}
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Last Location
            </a>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            setShowModal(false);
            setDetails("");
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
