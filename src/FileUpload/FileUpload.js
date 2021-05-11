import React, { Component } from 'react';
import { connect } from 'react-redux';
import { uploadActions } from '../_actions';
 export class FileUpload extends Component {

  constructor(props) {
        super(props);
     this.state={alert:false};
    }

 

  getBase64 = file => {
    return new Promise(resolve => {
      let baseURL = "";
      let reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };


  
  handleUpload=(event)=> {
    if(event.target.files.length!==0 &&  event.target.files[0].size> 4194304){
      this.setState({alert:true});
      this.inputRef=React.createRef();
      return;
    }

    let file = event.target.files[0];

    this.getBase64(file)
      .then(result => {
        this.props.changeImage({data:result,name:file.name});
        event.target.value = null;
        // this.setState({
        //   base64URL: result,
        //   fileName:file.name
        // });
      })
      .catch(err => {
        console.log(err);
      });

   
  };


  render() {
    return <div id="upload-box" style={{display:"flex"}}>
      <input type="file" onChange={this.handleUpload} accept="image/*" ref={this.inputRef} />
      {this.state.alert && <div class="alert alert-danger" role="alert">
  The file size should be less than 4mb!
</div>}
     {this.props.image?.name ?  <div>
      {/* <p>Filename: {this.props.image.name}</p>
    
     */}
      <img className="image-class" src={this.props.image.data} alt={this.props.image.name} />
      </div>:<></>}
    </div>
  }
}
function mapState(state) {
  const { image} = state.upload;
  return { image};
}

const actionCreators = {
  changeImage: uploadActions.changeImage
}

export default connect(mapState, actionCreators)(FileUpload);
