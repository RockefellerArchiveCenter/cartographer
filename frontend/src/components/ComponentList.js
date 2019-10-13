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
   this.setState({ activeComponent: item, detailModal: !this.state.detailModal });
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
       .then(res => this.props.refresh())
       .then(this.setState({detailModal: false}));
     return;
   }
   axios
     .post("/api/components/", item)
     .then(res => this.props.refresh())
     .then(this.setState({detailModal: false}));
 };
 handleDelete = component => {
   axios
     .delete(`/api/components/${component.id}`)
     .then(res => this.props.refresh())
     .then(this.toggleConfirmModal);
 };
 nodeMove = e => {
   e.node.parent = e.nextParentNode ? e.nextParentNode.id : null
   // tree order
   this.setState({activeComponent: e.node})
   this.handleSubmit(this.state.activeComponent)
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
                onMoveNode={this.nodeMove}
                generateNodeProps={({ node, path }) => ({
                  buttons: [
                    <button
                      className="btn btn-sm btn-success mr-2"
                      onClick={() => this.toggleDetailModal({title: "", parent: node.id})}
                    >
                      Add Child
                    </button>,
                    <button
                      className="btn btn-sm btn-secondary mr-2"
                      onClick={() => this.toggleDetailModal(node)}
                    >
                      Edit
                    </button>,
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => this.toggleConfirmModal(node)}
                    >
                      Remove
                    </button>,
                  ],
                })}
              />
             </div>
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
                 confirmMessage="Yes, delete it"
                 cancelMessage="Nope, cancel"
               />) : null}
           </div>
         </div>
       </div>
     </div>
   );
 }
}

export default ComponentList;
