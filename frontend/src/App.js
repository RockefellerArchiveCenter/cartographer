import React, { Component } from "react";
import MapForm from "./components/MapForm"
import MapList from "./components/MapList"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      activeItem: {
        title: "",
        description: "",
        completed: false
      },
    };
  }
  toggleForm = item => {
    this.setState({ activeItem: item, showForm: !this.state.showForm });
  }
  newMap = () => {
    const item = { title: "" };
    this.toggleForm(item)
  };
  render() {
    return (
      <main className="content">
        <h1 className="text-center my-4">Cartographer</h1>
        <div className="row ">
          <div className="col-md-8 col-sm-10 mx-auto p-0">
            {this.state.showForm ? null : (
              <div className="mb-3 float-right">
                <button onClick={this.newMap} className="btn btn-primary">
                  Add arrangement map
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 col-sm-10 mx-auto p-0">
            {this.state.showForm ? (
              <MapForm
               activeItem={this.state.activeItem}
               toggle={this.toggleForm}
              />
            ) : (
              <MapList
              onEdit={this.toggleForm}
              />
            )}
          </div>
        </div>
      </main>
    );
  }
}

export default App;
