import React from "react";
import Modal from "react-bootstrap/Modal";

const ErrorModal = ({show, onHide}) => {
  return (
    <Modal dialogClassName="laungerModal" show={(show)?true:false} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Uh oh...</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {show}
      </Modal.Body>
    </Modal>
  );
};

export default ErrorModal;
