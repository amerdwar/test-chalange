import React from "react";
import Enzyme, { shallow,mount} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Index } from "./index.component";
Enzyme.configure({ adapter: new Adapter() });

describe("<Index/>", () => {

  it("Have one Table Row", () => {
    const articles={items:[{title:"t1",date:"2020/2/2"}]};
    const wrapper = shallow(<Index  getAll={()=>{}} articles={articles}/>);
    //wrapper.setState(  {title:"", submitted :true} );
    expect(wrapper.find('tr')).toHaveLength(1);
    
  });
  
});
