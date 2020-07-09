import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const BothModal = ({ show, onHide, onTry, onGet, name, tryCost, getCost }) => {
  return (
    <Modal dialogClassName="laungerModal" show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          TRY or GET <strong>{name}</strong>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        You do not have <strong>{name}</strong> yet. Do you want to try it for today? Or get it forever?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button style={{ background: "orange", border: "solid orange 1px" }} onClick={onTry}>
          Try (-{tryCost})
        </Button>
        <Button variant="success" onClick={onGet}>
          Get (-{getCost})
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BothModal;
