import React, { Component } from "react";
import ComponentList from './ComponentList'
import axios from "axios";

import {
  Button,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";

class MapForm extends Component {
 constructor(props) {
   super(props);
   this.state = {
     activeMap: {"title": "", },
     addModal: false,
   };
 };
 componentDidMount() {
   this.refreshMap();
 };
 refreshMap = () => {
   if (this.props.match.params.id) {
     axios
       .get(`/api/maps/${this.props.match.params.id}`)
       .then(res => this.setState({ activeMap: res.data }))
       .catch(err => console.log(err));
   }
 }
 handleChange = e => {
   let { name, value } = e.target;
   if (e.target.type === "checkbox") {
     value = e.target.checked;
   }
   const activeMap = { ...this.state.activeMap, [name]: value };
   this.setState({ activeMap });
 };
 handleSubmit = map => {
   if (map.id) {
     axios
       .put(`/api/maps/${map.id}/`, map)
       .then(res => this.refreshMap());
     return;
   }
   axios
     .post("/api/maps/", map)
     .then(res => this.refreshMap());
 };
 render() {
   return (
     <div>
      <Form className="row mb-4" inline={true}>
        <FormGroup className="col-md-10">
          <Label for="title">Title</Label>
            <Input
              className="col-md-12"
              type="text"
              name="title"
              onChange={this.handleChange}
              value={this.state.activeMap.title}
              placeholder="Enter Arrangement Map title"
            />
          </FormGroup>
        </Form>
        {this.state.activeMap.id ? (
          <ComponentList
            activeMap={this.state.activeMap}
            items={this.state.activeMap.children}
            refresh={this.refreshMap}
          />
        ) : null}
        <div className="mt-4">
          <Button color="primary" className="mr-2" onClick={() => this.handleSubmit(this.state.activeMap)}>
            Save
          </Button>
          <a color="danger" className="btn btn-danger" href="/">
            Cancel
          </a>
        </div>
      </div>
    );
  }
}

export default MapForm;
