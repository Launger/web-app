import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useStore } from "react-hookstore";
import { useSessionStore } from "../../Utils/Hooks";

import { updateFireStorePoints } from "../../Helpers";

const TabModal = ({ show, onHide }) => {
  const [user, setUser] = useSessionStore("user"); 
  const [sPoints, setSPoints] = useStore("sPoints");
  
  const handleSave = () => {
    updateFireStorePoints(sPoints / 2)
      .then(msg => {
        setUser({
          ...user,
          totalPoints: user.totalPoints + sPoints/2,
        })
        setSPoints(0);
        onHide();
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="TabModal">
      <Modal dialogClassName="laungerModal" show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Attention! You will lose points!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You will lose all points earned today if you close this tab.
          <br />
          You will only lose 50% of all points if you click on SAVE.
          <br />
          If you would like to continue working, just click on CONTINUE.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            CONTINUE
          </Button>
          <Button variant="primary" onClick={handleSave}>
            SAVE
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TabModal;
