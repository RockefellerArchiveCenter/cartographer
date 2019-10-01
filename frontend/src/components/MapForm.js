import React, { Component } from "react";

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
 render() {
   const { onSave, onCancel } = this.props;
   return (
     <Form>
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
       <Button color="primary" className="mr-2" onClick={() => onSave(this.state.activeItem)}>
         Save
       </Button>
       <Button color="danger" onClick={() => onCancel()}>
         Cancel
       </Button>
     </Form>
   );
 }
}

export default MapForm;
