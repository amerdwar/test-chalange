import React, { Component } from 'react';
import { connect } from 'react-redux';
import TableRow from './TableRow';
import {Button,Modal} from 'react-bootstrap'
import Create from './create.component'
import Edit from './edit.component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus} from '@fortawesome/free-solid-svg-icons'
import { alertModalActions } from '../_actions';
import { articleActions } from '../_actions';
import '../App.css'

 export class Index extends Component {

  constructor(props) {
      super(props);
      this.state={}
    }
    componentDidMount(){
      this.props.getAll();
    }
    openEditModal=(id)=>{
      this.props.clearAlert();
this.setState({articleEditId:id,showEditModal:true});
    }
    tabRow(){
   
      if (this.props.articles && this.props.articles.items  && this.props.articles.items.length > 0){
      return this.props.articles.items.map((object, i)=>{
          return <TableRow obj={object} openEditModal={this.openEditModal} key={i} />;
      });
    }
    }
    handleClose=()=>{
      this.props.getAll();

      this.setState({showModal:false});

    }

    handleEditClose=()=>{
this.props.getAll();
      this.setState({showEditModal:false});
          }

    handleShow=()=>{
      this.props.clearAlert()
      this.setState({showModal:true});
    }
    render() {

    
      return (
        
        <div>
             



      <Modal  style={{opacity:1}} backdrop="static"  show={this.state.showModal} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Article</Modal.Title>
        </Modal.Header>
        <Modal.Body>    <Create /></Modal.Body>
       
      </Modal>

      <Modal  style={{opacity:1}} backdrop="static"   show={this.state.showEditModal} onHide={this.handleEditClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Article</Modal.Title>
        </Modal.Header>
        <Modal.Body>    <Edit articleEditId={this.state.articleEditId}/></Modal.Body>
        
      </Modal>
 
          <table className="table table-striped " style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>title</th>
                <th>date</th>
               
                <th >Actions <Button title="Add New Article" variant="primary" onClick={this.handleShow}>
                <FontAwesomeIcon icon={faPlus} />
      </Button></th>
              
              </tr>
            </thead>
            <tbody>
              { this.tabRow() }
            </tbody>
          </table>
        </div>
      );
    }
  }

  function mapState(state) {
  
    const { articles } = state;

    return { articles };
}

const actionCreators = {
    getAll: articleActions.getAll,
    deleteAricle: articleActions.delete,
    clearAlert:alertModalActions.clear
}

export default connect(mapState, actionCreators)(Index);
