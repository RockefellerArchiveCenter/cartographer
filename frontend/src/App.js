import React, { Component } from "react";
import MapForm from "./components/MapForm"
import MapList from "./components/MapList"
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteModal: false,
      mapList: true,
      activeItem: {
        title: "",
        description: "",
        completed: false
      },
    };
  }
  toggleForm = item => {
    this.setState({ activeItem: item, addMap: !this.state.addMap, mapList: !this.state.mapList });
  }
  refreshList = () => {
    this.setState({mapList: true, addMap: false})
    axios
      .get("/api/maps/")
      .then(res => this.setState({ arrangementMapList: res.data.results }))
      .catch(err => console.log(err));
  };
  handleSubmit = item => {
    if (item.id) {
      axios
        .put(`/api/maps/${item.id}/`, item)
        .then(res => this.refreshList());
      return;
    }
    axios
      .post("/api/maps/", item)
      .then(res => this.refreshList());
  };
  newMap = () => {
    const item = { title: "" };
    this.toggleForm(item)
  };
  editItem = item => {
    this.toggleForm(item)
  };
  render() {
    return (
      <main className="content">
        <h1 className="text-center my-4">Cartographer</h1>
        <div className="row ">
          <div className="col-md-8 col-sm-10 mx-auto p-0">
            {this.state.addMap ? null : (
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
            {this.state.mapList ? (
              <MapList
              onEdit={this.editItem}
              />
            ) : null}
            {this.state.addMap ? (
              <MapForm
               activeItem={this.state.activeItem}
               onCancel={this.toggleForm}
               onSave={this.handleSubmit}
              />
            ) : null}
          </div>
        </div>
      </main>
    );
  }
}

export default App;
