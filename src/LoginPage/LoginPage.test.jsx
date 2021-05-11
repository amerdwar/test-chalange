import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { LoginPageForTest }   from "./LoginPage";
Enzyme.configure({ adapter: new Adapter() });

describe("<LoginPageForTest/>", () => {


  it("show two  has-error Empty User Name and password", () => {
    let obj = { date: new Date(), title: "title", content: "content" ,id:1};
    const wrapper = shallow(<LoginPageForTest logout={()=>{}}/>);
  
    wrapper.setState(  { username:"", password:"", submitted :true} );
    expect(wrapper.find('.has-error')).toHaveLength(2);
    
  });
  it("show two  help-block Empty User Name and password show required message", () => {
    let obj = { date: new Date(), title: "title", content: "content" ,id:1};
    const wrapper = shallow(<LoginPageForTest logout={()=>{}}/>);
  
    wrapper.setState(  { username:"", password:"", submitted :true} );
    expect(wrapper.find('.help-block')).toHaveLength(2);
    
  });


});
