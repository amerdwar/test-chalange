import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { HomePageForTest } from "./HomePage";
Enzyme.configure({ adapter: new Adapter() });

describe("<HomePageForTest/>", () => {


  it("show one user except the logged in users", () => {
    let users={ items:[ {
      firstName: 'fname',
      lastName: 'lname',
      username: 'uname',
      password: 'pass',
      id:1
  }, {
    firstName: 'fname2',
    lastName: 'lname2',
    username: 'uname2',
    password: 'pass2',
    id:2
}]};

  let user={
    firstName: 'fname',
    lastName: 'lname',
    username: 'uname',
    password: 'pass',
    id:1
}
    const wrapper = shallow(<HomePageForTest users={users} user={user} getUsers={()=>{}} />);
  
    expect(wrapper.find('li')).toHaveLength(1);
    
  });


});
