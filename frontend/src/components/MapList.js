import React, { Component } from "react";
import ConfirmModal from "./ConfirmModal";
import axios from "axios";


class MapList extends Component {
 constructor(props) {
   super(props);
   this.state = {
     deleteModal: false,
     addMap: false,
     mapList: true,
     arrangementMapList: []
   };
 }
 componentDidMount() {
   this.refreshList();
 }
 toggleModal = () => {
   this.setState({ deleteModal: !this.state.deleteModal });
 }
 refreshList = () => {
   axios
     .get("/api/maps/")
     .then(res => this.setState({ arrangementMapList: res.data.results }))
     .catch(err => console.log(err));
 };
 confirmDelete = item => {
   console.log(this.state.deleteModal)
   this.setState({ activeItem: item, deleteModal: !this.state.deleteModal });
 }
 handleDelete = item => {
   this.toggleModal()
   axios
     .delete(`http://localhost:8000/api/maps/${item.id}`)
     .then(res => this.refreshList());
 };
 render() {
   const { onEdit } = this.props;
   return (
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
                 onClick={() => onEdit(item)}
                 className="btn btn-secondary mr-2"
               >
                 Edit
               </button>
               <button
                 onClick={() => this.confirmDelete(item)}
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
           activeItem={this.state.activeItem}
           toggle={this.toggleModal}
           onConfirm={this.handleDelete}
           message="Are you sure you want to delete this component?"
         />
       ) : null}
     </div>
   );
 }
}

export default MapList;
