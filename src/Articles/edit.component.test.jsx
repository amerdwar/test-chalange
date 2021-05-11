import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Edit } from "./edit.component";
import { CKEditor } from '@ckeditor/ckeditor5-react';
Enzyme.configure({ adapter: new Adapter() });

describe("<Edit/>", () => {
let wrapper;
beforeEach(()=>{
   wrapper = shallow(<Edit  alertModal={{type:"",message:""}} />);
  
});

  it("show that title is empty", () => {
 
    wrapper.setState(  {title:"", submitted :true} );
    expect(wrapper.find('.has-error')).toHaveLength(1);
    
  });
  
 
  


});
