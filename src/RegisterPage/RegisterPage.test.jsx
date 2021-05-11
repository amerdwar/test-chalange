import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { RegisterPageForTest } from "./RegisterPage";
Enzyme.configure({ adapter: new Adapter() });

describe("<RegisterPageForTest/>", () => {


  it("show two  help-block Empty User Name ,first name , last name and password", () => {
    let obj = { date: new Date(), title: "title", content: "content" ,id:1};
    const wrapper = shallow(<RegisterPageForTest />);
  
    wrapper.setState(  {user:{ username:"", password:"",lastName:"",firstName:""}, submitted :true} );
    expect(wrapper.find('.help-block')).toHaveLength(4);
    
  });
  
  it("show that Email is not valid", () => {
    const wrapper = shallow(<RegisterPageForTest />);
  
    wrapper.setState(  {user:{ username:"aaff", password:"ff",lastName:"ff",firstName:"ff"}, submitted :true} );
    expect(wrapper.find('.help-block')).toHaveLength(1);
    
  });
  

  it("show that Email  is valid", () => {
    const wrapper = shallow(<RegisterPageForTest />);
  
    wrapper.setState(  {user:{ username:"aaff@gmail.com", password:"ff",lastName:"ff",firstName:"ff"}, submitted :true} );
    expect(wrapper.find('.help-block')).toHaveLength(0);
    
  });
  

});
