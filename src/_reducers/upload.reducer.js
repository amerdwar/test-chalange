import { uploadConstants } from '../_constants';

export function upload(state = {}, action) {
  switch (action.type) {
    case uploadConstants.CLEAR:
      return {
     
        image: {}
      };
    case uploadConstants.CHANGE_IMAGE:
      return {
     
        image: action.image
      };
    
    default:
      return state
  }
}