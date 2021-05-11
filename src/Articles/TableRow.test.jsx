import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { TableRow } from "./TableRow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
Enzyme.configure({ adapter: new Adapter() });

describe("<TableRow>", () => {


  it("Has two FontAwesomeIcon", () => {
    let obj = { date: new Date(), title: "title", content: "content" ,id:1};
    const wrapper = shallow(<TableRow obj={obj} />);
    expect(wrapper.find(FontAwesomeIcon)).toHaveLength(2);
  });

  it(" hide deleting image", () => {
    let obj = { date: new Date(), title: "title", content: "content" ,id:1,deleting:false};
    const wrapper = shallow(<TableRow obj={obj}  />);
    //const node = wrapper.find("img");

    let containerStyle = wrapper.find('img').get(0).props.style;

    expect(containerStyle).toHaveProperty('visibility', 'hidden'); // ('propert', 'value')
    
    //expect(getComputedStyle(node.getDOMNode()).getPropertyValue('visibility')).toBe('none')

    
  });

  it(" show deleting image", () => {
    let obj = { date: new Date(), title: "title", content: "content" ,id:1,deleting:true};
    const wrapper = shallow(<TableRow obj={obj}  />);
    //const node = wrapper.find("img");

    let containerStyle = wrapper.find('img').get(0).props.style;

    expect(containerStyle).toHaveProperty('visibility', ''); // ('propert', 'value')
    
    //expect(getComputedStyle(node.getDOMNode()).getPropertyValue('visibility')).toBe('none')

    
  });

});
