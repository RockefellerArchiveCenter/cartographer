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
   this.toggle = this.props.toggle
   this.state = {
     addModal: false,
     activeMap: this.props.activeMap
   };
 };
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
       .then(res => this.toggle());
     return;
   }
   axios
     .post("/api/maps/", map)
     .then(res => this.toggle());
 };
 render() {
   return (
     <div>
      <Form onSubmit={() => this.handleSubmit(this.state.activeMap)}>
        <FormGroup>
          <Label for="title">Title</Label>
            <Input
              type="text"
              name="title"
              onChange={this.handleChange}
              value={this.state.activeMap.title}
              placeholder="Enter Arrangement Map title"
            />
          </FormGroup>
          <Button type="submit" color="primary" className="mr-2">
            Save
          </Button>
          <Button color="danger" onClick={() => this.toggle(this.state.activeMap)}>
            Cancel
          </Button>
        </Form>
        <ComponentList
          activeMap={this.state.activeMap}
        />
      </div>
    );
  }
}

export default MapForm;
