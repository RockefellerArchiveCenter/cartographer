import React, { Component } from "react";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.props.toggle
    this.onSubmit = this.props.onSubmit
    this.state = {
      activeMap: this.props.activeMap,
      activeComponent: this.props.activeComponent,
    };
  }
  handleChange = e => {
    let { name, value } = e.target;
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }
    const activeComponent = { ...this.state.activeComponent, [name]: value };
    this.setState({ activeComponent });
  };
  render() {
    const { toggle } = this.props;
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}> Arrangement Map Component </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="text"
                name="title"
                value={this.state.activeComponent.title}
                onChange={this.handleChange}
                placeholder="Enter component title"
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">ArchivesSpace URI</Label>
              <Input
                type="text"
                name="archivesspace_uri"
                value={this.state.activeComponent.archivesspace_uri}
                onChange={this.handleChange}
                placeholder="Enter an ArchivesSpace URI"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => this.onSubmit(this.state.activeComponent)}>
            Save
          </Button>
          <Button color="danger" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
