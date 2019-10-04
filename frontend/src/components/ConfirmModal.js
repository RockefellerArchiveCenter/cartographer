import React, { Component } from "react";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

export default class ConfirmModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem
    };
  }
  render() {
    const { toggle, message, onConfirm } = this.props;
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}> Confirm Delete </ModalHeader>
        <ModalBody>
          {message}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={onConfirm}>
            Yes, delete it
          </Button>
          <Button color="secondary" onClick={toggle}>
            Nope, cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
