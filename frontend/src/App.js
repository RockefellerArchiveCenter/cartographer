import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MapForm from "./components/MapForm";
import MapList from "./components/MapList";

import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav} from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <main className="content">
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">Cartographer</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <Button href="/maps/new" color="primary">Add New Map</Button>
            </Nav>
          </Collapse>
        </Navbar>
        <div className="row mt-4">
          <div className="col-md-8 col-sm-10 mx-auto p-0">
          <Router>
            <Route exact path="/" component={MapList} />
            <Route exact path="/maps/new" component={MapForm} />
            <Route path="/maps/:id" component={MapForm} />
          </Router>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
