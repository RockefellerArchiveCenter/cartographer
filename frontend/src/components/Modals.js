import React, { Component } from "react";
import classnames from 'classnames';
import {
  Alert,
  Badge,
  Button,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";
import axios from "axios";

export class MapComponentModal extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.props.toggle
    this.onSubmit = this.props.onSubmit
    this.onChange = this.props.onChange
    this.state = {
      activeMap: this.props.activeMap,
      activeComponent: this.props.activeComponent,
      resourceId: "",
      error: "",
      activeTab: (!this.props.activeComponent.archivesspace_uri && this.props.activeComponent.title) ? '2' : '1',
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
  handleResourceIdChange = e => {
    let { value } = e.target;
    this.setState({ resourceId: value })
  };
  toggleData = data => {
    if (data.data) {
      this.handleChange({"target": {"name": "archivesspace_uri", "value": data.data.uri}});
      this.handleChange({"target": {"name": "title", "value": data.data.title}});
      return;
    }
    this.handleChange({"target": {"name": "title", "value": ""}});
    this.handleChange({"target": {"name": "archivesspace_uri", "value": ""}});
  };
  fetchResource = resourceId => {
    this.setState({error: ""})
    axios
      .get(`api/fetch-resource/${resourceId}`)
      .then(res => this.toggleData(res))
      .catch(error => this.setState({error: error.response.data}));
  };
  toggleTab = tab => {
    if(this.activeTab !== tab) this.setState({activeTab: tab});
  };
  render() {
    const { toggle } = this.props;
    return (
      <Modal isOpen={true} toggle={toggle} className="modal-md">
        <ModalHeader toggle={toggle}> Arrangement Map Component </ModalHeader>
        <ModalBody>
          <div>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  onClick={() => { this.toggleTab('1'); }}
                >
                  ArchivesSpace Resource
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.toggleTab('2'); }}
                >
                  Custom Resource
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <Row>
                  <Col sm="12">
                  { this.state.error ? (
                    <Alert className="mt-2" color="danger">
                      {this.state.error}
                    </Alert>) : null
                  }
                  { this.state.activeComponent.archivesspace_uri ? (
                    <div className="mt-2">
                      <h2><Badge color="secondary">{this.state.activeComponent.title}</Badge></h2>
                      <p className="text-muted">{this.state.activeComponent.archivesspace_uri}</p>
                      <Button
                        color="warning"
                        onClick={this.toggleData}
                        >
                        Clear
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <Form>
                        <FormGroup>
                          <Label for="description">ArchivesSpace Resource ID</Label>
                          <Input
                            type="number"
                            name="resourceId"
                            value={this.state.resourceId}
                            onChange={this.handleResourceIdChange}
                            placeholder="Enter an ArchivesSpace Resource ID"
                          />
                        </FormGroup>
                      </Form>
                      <Button
                        className="btn btn-sm btn-secondary"
                        onClick={() => this.fetchResource(this.state.resourceId)}
                        >
                        Fetch from ArchivesSpace
                      </Button>
                    </div>)}
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <Row>
                  <Col sm="12">
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
                  </Form>
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => this.onSubmit(this.state.activeComponent)}
            disabled={!this.state.activeComponent.title}>
            Save
          </Button>
          <Button
            color="danger"
            onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export class ConfirmModal extends Component {
  render() {
    const { toggle, message, onConfirm, cancelButtonText, confirmButtonText } = this.props;
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}> Confirm Delete </ModalHeader>
        <ModalBody>
          {message}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={onConfirm}>
            {confirmButtonText}
          </Button>
          <Button color="secondary" onClick={toggle}>
            {cancelButtonText}
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
