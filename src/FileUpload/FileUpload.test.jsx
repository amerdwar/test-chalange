import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { FileUpload } from "./FileUpload";
Enzyme.configure({ adapter: new Adapter() });

describe("<FileUpload/>", () => {


  it("shoud show image", () => {
    let img = { data:"",name:"name"};
    const wrapper = shallow(<FileUpload image={img} />);
  
    //wrapper.setState(  { username:"", password:"", submitted :true} );
    expect(wrapper.find('img')).toHaveLength(1);
    
  });
 
  it("shoud show size alert", () => {
    let img = { data:"",name:"name"};
    const wrapper = shallow(<FileUpload image={img} />);
  
    wrapper.setState(  { alert:true} );
    expect(wrapper.html()).toContain("The file size should be less than 4mb");
    
  });

  it("shoud not show size alert", () => {
    let img = { data:"",name:"name"};
    const wrapper = shallow(<FileUpload image={img} />);
  
    wrapper.setState(  { alert:false} );
    expect(wrapper.html()).not.toContain("The file size should be less than 4mb");
    
  });
 
});
