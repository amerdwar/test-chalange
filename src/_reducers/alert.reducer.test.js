import { alertConstants } from '../_constants';
import  {alert} from './alert.reducer'


describe("alert reducer", () => {

  it("should return initial sate", () => {
   
    expect(alert(undefined,{})).toEqual({});
  });
  it("should return success message", () => {
   
    expect(alert(undefined,{type:alertConstants.SUCCESS,message:"success"})).toEqual({
      type: 'alert-success',
      message: "success"}
    );
  });

  it("should return error message", () => {
   
    expect(alert(undefined,{type:alertConstants.ERROR,message:"error"})).toEqual({
      type: 'alert-danger',
      message: "error"}
    );
  });

 

});
