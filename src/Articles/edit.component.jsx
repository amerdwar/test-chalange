import React, { Component } from 'react';
import { connect } from 'react-redux';
import { articleActions } from '../_actions';
import { articleService } from '../_services';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FileUpload from "../FileUpload/FileUpload"
import { uploadActions } from '../_actions';
import { alertModalActions } from '../_actions';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


export class  Edit extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeContent = this.onChangeContent.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: '',
      content: '',
      date:null,
      image:null
    }

 
  }
  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }
  onChangeContent(e) {
    this.setState({
      content: e.target.getContent()
    })  
  }
  onChangeDate(val) {
    this.setState({
      date: val
    })
  }
  componentDidMount(){
    articleService.getById(this.props.articleEditId)
    .then(
  
        article => 
        
        {
          this.props.changeImage(article.image);
          return  this.setState( {
          id:this.props.articleEditId,
          title: article.title,
          content: article.content,
          date: new Date(article.date),
          image:article.image
        })}
    );
  }
  onSubmit(e) {
    e.preventDefault();

    this.props.clearAlert();
    
    if (!this.state.title.trim() ){
      this.setState({ submitted: true });
      return;
    }
    const obj = {
      id:this.props.articleEditId,
      title: this.state.title,
      content: this.state.content,
      date: this.state.date,
      image:this.props.image
    };
this.props.update(obj);
this.setState({

  submitted:false

})
  }
 
  render() {
    const { alertModal } = this.props;
    const {  submitted,title } = this.state;
    return (
        <div style={{ marginTop: 10 }}>
           {alertModal.message &&
                            <div className={`alert ${alertModal.type}`}>{alertModal.message}</div>}
            <form onSubmit={this.onSubmit}>
            <div className={'form-group' + (submitted && !title.trim() ? ' has-error' : '')}>
                    <label>Title  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state?.title}
                      onChange={this.onChangeTitle}
                      />
                       {submitted && !title.trim()  &&
                            <div className="help-block">Title is required</div>
                        }
                </div>
                <div className="form-group">
                    <label>Select Image  </label>
                    <FileUpload  />
    
                </div>
                <div className="form-group">
                    <label>Content </label>
                    <CKEditor
     
     editor={ ClassicEditor }
  data={this.state.content}
     onChange={ ( event, editor ) => {
         const data = editor.getData();
         this.setState({content:data});
     } }
  
 />
                </div>
                <div className="form-group">
                    <label>Date </label>
                  {" "}
                    <DatePicker
                    required
  selected={this.state?.date}
  dateFormat="yyyy/MM/dd"
  onChange={this.onChangeDate} //only when value has changed
/>
                      
                </div>
                <div className="form-group">
                    <input type="submit" 
                      value="Save" 
                      className="btn btn-primary"/>
                      {this.props.editing && 
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                </div>
            </form>
        </div>
    )
  }
}

function mapState(state) {
  const { editing ,article} = state.articles;
  const {image}= state.upload;
  const {alertModal}=state;
  return { editing ,article,image,alertModal};
}

const actionCreators = {
  getAll: articleActions.getAll,
  getById: articleActions.getById,
  update:articleActions.update,
  clearImage:uploadActions.clear,
  changeImage: uploadActions.changeImage,
  clearAlert:alertModalActions.clear

}

export default connect(mapState, actionCreators)(Edit);
