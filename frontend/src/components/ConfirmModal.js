import React, { Component } from "react";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

export default class ConfirmModal extends Component {
  render() {
    const { toggle, message, onConfirm, confirmMessage, cancelMessage } = this.props;
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}> Confirm Delete </ModalHeader>
        <ModalBody>
          {message}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={onConfirm}>
            {confirmMessage}
          </Button>
          <Button color="secondary" onClick={toggle}>
            {cancelMessage}
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
