import React, { Component } from "react";
import MapForm from "./components/MapForm";
import MapList from "./components/MapList";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      activeMap: {
        title: "",
        children: "",
      }
    };
  }
  toggle = map => {
    this.setState({ activeMap: map, showForm: !this.state.showForm });
  }
  render() {
    return (
      <main className="content">
        <h1 className="text-center my-4">Cartographer</h1>
        <div className="row">
          <div className="col-md-8 col-sm-10 mx-auto p-0">
            {this.state.showForm ? (
              <MapForm
              activeMap={this.state.activeMap}
              toggle={this.toggle}
              />
              ) : (
              <MapList
              toggle={this.toggle}
              />
            )}
          </div>
        </div>
      </main>
    );
  }
}

export default App;
