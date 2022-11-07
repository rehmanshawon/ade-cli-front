import React, { useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import swal from "sweetalert";
import Axios from "axios";

function DeleteModal({
  showDelete,
  setShowDelete,
  selectedUser,
  setSelectedUser,
  title,
  accessToken,
  refreshToken,
  url,
  fetchLists,
}) {
  const [loading, setLoading] = useState(false);

  const handleDeleteUser = async () => {
    setLoading(true);

    await Axios.delete(`${process.env.REACT_APP_API_URL}/${url}`, {
      data: {
        id: selectedUser.id ? selectedUser.id : 0,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        refreshToken: refreshToken,
      },
    })
      .then(async (res) => {
        if (!res.data.data?.error) {
          console.log({ res });
          setShowDelete(false);
          setSelectedUser(null);
          setLoading(false);

          swal({
            title: res.data.message,
            icon: "success",
          });
        }
      })
      .catch((error) => {
        console.log({ error });
        swal({
          title: error.message,
          icon: "error",
        });
        setLoading(false);
      });
  };
  return (
    <Modal
      show={showDelete}
      onHide={() => setShowDelete(false)}
      aria-labelledby="example-modal-sizes-title-lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure to delete {selectedUser && selectedUser.name} ?
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={() => setShowDelete(false)}
            className="btn btn-light btn-elevate mr-3"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={async () => {
              handleDeleteUser();
              await fetchLists();
            }}
            className="btn btn-primary btn-danger"
            disabled={loading}
          >
            Delete
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
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteModal;
