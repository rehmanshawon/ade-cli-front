import React from "react";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { icons } from "../../../../data/fontAwesome";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";

function importAll(r) {
  return r.keys().map(r);
}

const IconModal = ({ showDetails, setShowDetails, setSelected, selected }) => {
  const icon = [...icons];

  const filenames = importAll(require.context("./all", false, /\.(svg)$/));

  console.log({ filenames });
  const [searchList, setSearchList] = useState(filenames ?? []);
  const [search, setSearch] = useState("");

  const handleSearch = searchList.filter((icon) => {
    return icon.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <Modal
      show={showDetails}
      onHide={() => {
        setShowDetails(false);
      }}
      size="lg"
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
        <div className="mb-5">
          <input
            className="form-control"
            placeholder="search"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
        <div
          style={{
            height: "500px",
            overflowY: "auto",
            gap: "10px",
            justifyContent: "center",
          }}
          className="row"
        >
          {handleSearch &&
            handleSearch.length > 0 &&
            handleSearch.map((item, i) => (
              <div
                className="col-md-3 mb-2 btn btn-default"
                style={{ height: "120px", width: "120px" }}
                key={i}
              >
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
                  <span className="" style={{ fontSize: "30px" }}>
                    <SVG src={toAbsoluteUrl(item)} />
                  </span>
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
