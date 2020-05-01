import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const WarningModal = ({show, setShow, handleFinish}) => {
  return (
    <Modal dialogClassName="laungerModal" show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Time's up!<br/>Don't procrastinate, you will loose points!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        You will <strong>loose</strong> 10 points every 10 seconds,
        and <strong>loose</strong> 100 points every 30 seconds.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleFinish}>
          Get back to work
        </Button>
        <Button variant="primary" onClick={() => setShow(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
};
export default WarningModal;
