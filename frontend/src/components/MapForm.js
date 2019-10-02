import React, { Component } from "react";
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
     activeItem: this.props.activeItem
   };
 }
 handleChange = e => {
   let { name, value } = e.target;
   // if (e.target.type === "checkbox") {
   //   value = e.target.checked;
   // }
   const activeItem = { ...this.state.activeItem, [name]: value };
   this.setState({ activeItem });
 };
 handleSubmit = item => {
   if (item.id) {
     axios
       .put(`/api/maps/${item.id}/`, item)
       .then(res => this.toggle());
     return;
   }
   axios
     .post("/api/maps/", item)
     .then(res => this.toggle());
 };
 render() {
   return (
     <Form onSubmit={() => this.handleSubmit(this.state.activeItem)}>
       <FormGroup>
         <Label for="title">Title</Label>
         <Input
           type="text"
           name="title"
           onChange={this.handleChange}
           value={this.state.activeItem.title}
           placeholder="Enter Arrangement Map title"
         />
       </FormGroup>
       <Button type="submit" color="primary" className="mr-2" >
         Save
       </Button>
       <Button color="danger" onClick={() => this.toggle()}>
         Cancel
       </Button>
     </Form>
   );
 }
}

export default MapForm;
