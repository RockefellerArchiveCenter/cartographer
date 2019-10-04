import React, { Component } from "react";
import ConfirmModal from "./ConfirmModal";
import axios from "axios";


class MapList extends Component {
 constructor(props) {
   super(props);
   this.toggle = this.props.toggle
   this.state = {
     deleteModal: false,
     showForm: false,
     arrangementMapList: []
   };
 }
 componentDidMount() {
   this.refreshList();
 }
 toggleModal = map => {
   this.setState({ activeMap: map, deleteModal: !this.state.deleteModal });
 }
 refreshList = () => {
   axios
     .get("/api/maps/")
     .then(res => this.setState({ arrangementMapList: res.data.results }))
     .catch(err => console.log(err));
 };
 newMap = () => {
   const item = { title: "" };
   this.toggle(item)
 };
 handleDelete = item => {
   axios
     .delete(`http://localhost:8000/api/maps/${item.id}`)
     .then(res => this.refreshList());
  this.toggleModal(item)
 };
 render() {
   return (
     <div className="row">
      <div className="col-md-12">
        <div className="mb-3 text-right">
          <button onClick={this.newMap} className="btn btn-primary">
            Add arrangement map
          </button>
        </div>
       <div className="card p-3">
         <ul className="list-group list-group-flush">
          {this.state.arrangementMapList.length ? (this.state.arrangementMapList.map(item => (
             <li
               key={item.id}
               className="list-group-item d-flex justify-content-between align-items-center"
             >
               <span
                 className="mr-2"
               >
                 {item.title}
               </span>
               <span>
                 <button
                   onClick={() => this.toggle(item)}
                   className="btn btn-secondary mr-2"
                 >
                   Edit
                 </button>
                 <button
                   onClick={() => this.toggleModal(item)}
                   className="btn btn-danger"
                 >
                   Delete
                 </button>
               </span>
             </li>
           ))) : "No Arrangement Maps yet"
         }
         </ul>
         {this.state.deleteModal ? (
           <ConfirmModal
             activeItem={this.state.activeMap}
             toggle={this.toggleModal}
             onConfirm={() => this.handleDelete(this.state.activeMap)}
             message={`Are you sure you want to delete ${this.state.activeMap.title}?`}
           />
         ) : null}
       </div>
      </div>
    </div>
   );
 }
}

export default MapList;
