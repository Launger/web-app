import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const GetModal = ({ show, onHide, onClick, name, getCost }) => {
  return (
    <Modal dialogClassName="laungerModal" show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>GET {name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to get <strong>{name}</strong> for {getCost} points?
        <br />
        Getting a widget means you will have it forever.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="success" onClick={onClick}>
          Get (-{getCost})
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GetModal;
