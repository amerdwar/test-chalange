import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Create } from "./create.component";
import { CKEditor } from '@ckeditor/ckeditor5-react';
Enzyme.configure({ adapter: new Adapter() });

describe("<Create/>", () => {


  it("show that title is empty", () => {
    const wrapper = shallow(<Create  clearImage={()=>{}} alertModal={{type:"",message:""}} />);
  
    wrapper.setState(  {title:"", submitted :true} );
    expect(wrapper.find('.has-error')).toHaveLength(1);
    
  });
  
  it("has CKEditor", () => {
    const wrapper = shallow(<Create clearImage={()=>{}} alertModal={{type:"",message:""}} />);
  
    expect(wrapper.find(CKEditor)).toHaveLength(1);
    
  });
  


});
