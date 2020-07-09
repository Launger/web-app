import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const TryModal = ({ show, onHide, onClick, name, tryCost }) => {
  return (
    <Modal dialogClassName="laungerModal" show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>TRY {name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to try <strong>{name}</strong> for {tryCost} points?
        <br />
        Trying a widget means you will only have it today.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button style={{ background: "orange", border: "solid orange 1px" }} onClick={onClick}>
          Try (-{tryCost})
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TryModal;
