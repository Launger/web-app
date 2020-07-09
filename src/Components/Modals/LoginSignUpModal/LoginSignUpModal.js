import React from "react";
import Modal from "react-bootstrap/Modal";

import LoginSignUp from "../../LoginSignUp/LoginSignUp";

import "./LoginSignUpModal.css";

const LoginSignUpModal = ({ show, onHide }) => {
  return (
    <Modal dialogClassName="login-modal" show={show} onHide={() => onHide()} size="sm">
      <Modal.Header>
        <LoginSignUp />
      </Modal.Header>
    </Modal>
  );
};

export default LoginSignUpModal;
