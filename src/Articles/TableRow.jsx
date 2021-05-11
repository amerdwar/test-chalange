import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { articleActions } from '../_actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash,faEdit} from '@fortawesome/free-solid-svg-icons'
export class TableRow extends Component {

  constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }
    delete() {
this.props.deleteAricle(this.props.obj.id);

    }
    edit=()=>{
this.props.openEditModal(this.props.obj.id);
    }
    
  render() {
    let deletingStyle={visibility:this.props.obj?.deleting ?"":"hidden"}
  const date=new Date(this.props.obj.date);
  const dateStr =""+date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
    return (
        <tr>
          <td>
            {this.props.obj.title}
          </td>
          <td>
            {dateStr}
          </td>
         
          <td>
            <button onClick={this.edit} className="btn btn-primary" title="Edit">  
              <FontAwesomeIcon icon={faEdit} /></button>
        
         
            <button style={{    marginLeft: "13px"}} onClick={this.delete} className="btn btn-danger" title="delete">  
              
               <FontAwesomeIcon icon={faTrash} ></FontAwesomeIcon>
           
               
               </button>
               {    <img style={deletingStyle} src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }

                        
          </td>
        </tr>
    );
  }
}
function mapState(state) {

  const { deleting } = state.articles;
  return { deleting };
}


const actionCreators = {
  deleteAricle: articleActions.delete
}

export default connect(null, actionCreators)(TableRow);
