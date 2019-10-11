import React, { Component } from "react";
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import ComponentModal from './ComponentModal'
import ConfirmModal from './ConfirmModal'
import axios from "axios";


class ComponentList extends Component {
 constructor(props) {
   super(props);
   this.state = {
     detailModal: false,
     confirmModal: false,
     activeComponent: {title: ""},
   };
 }
 toggleDetailModal = (item, onSave) => {
   console.log(item)
   this.setState({ activeComponent: item, onSave: onSave, detailModal: !this.state.detailModal });
   console.log(this.state)
   this.props.refresh();
 };
 toggleConfirmModal = item => {
   this.setState({ activeComponent: item, confirmModal: !this.state.confirmModal });
 };
 handleSubmit = item => {
   item.map = this.props.activeMap.id;
   if (item.id) {
     axios
       .put(`/api/components/${item.id}/`, item)
       .then(res => this.toggleDetailModal());
     return;
   }
   axios
     .post("/api/components/", item)
     .then(res => this.toggleDetailModal());
 };
 handleChange = e => {
   let { name, value } = e.target;
   if (e.target.type === "checkbox") {
     value = e.target.checked;
   }
   const activeComponent = { ...this.state.activeComponent, [name]: value };
   this.setState({ activeComponent });
 };
 handleDelete = component => {
   axios
     .delete(`/api/components/${component.id}`)
     .then(res => this.props.refresh())
     .then(this.toggleConfirmModal);
 };
 render() {
   return (
     <div>
       <div className="row">
         <div className="col-md-12">
           <div className="card p-3">
             <div className="mb-3">
               <button onClick={() => this.toggleDetailModal({title: ""})} className="btn btn-primary">
                 Add arrangement map component
               </button>
             </div>
             <div style={{ height: 400 }}>
              <SortableTree
                treeData={this.props.items}
                onChange={this.props.onChange}
              />
             </div>
             <ul className="list-group list-group-flush">
              {this.props.items ? (this.props.items.map(item => (
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
                       onClick={() => this.toggleDetailModal(this.state.activeComponent)}
                       onChange={this.handleChange}
                       className="btn btn-success mr-2"
                     >
                       Add child
                     </button>
                     <button
                       onClick={() => this.toggleDetailModal(item)}
                       onChange={this.handleChange}
                       className="btn btn-secondary mr-2"
                     >
                       Edit
                     </button>
                     <button
                       onClick={() => this.toggleConfirmModal(item)}
                       onChange={this.handleChange}
                       className="btn btn-danger"
                     >
                       Delete
                     </button>
                   </span>
                 </li>
               ))) : "No Arrangement Map Components yet"
             }
             </ul>
             {this.state.detailModal ? (
               <ComponentModal
                 activeComponent={this.state.activeComponent}
                 activeMap={this.props.activeMap}
                 toggle={this.toggleDetailModal}
                 onSubmit={this.handleSubmit}
               />) : null}
             {this.state.confirmModal ? (
               <ConfirmModal
                 activeItem={this.state.activeComponent}
                 toggle={this.toggleConfirmModal}
                 onConfirm={() => this.handleDelete(this.state.activeComponent)}
                 message={`Are you sure you want to delete ${this.state.activeComponent.title}?`}
               />) : null}
           </div>
         </div>
       </div>
     </div>
   );
 }
}

export default ComponentList;
