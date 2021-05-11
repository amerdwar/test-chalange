import { alertModalConstants } from '../_constants';

export function alertModal(state = {}, action) {
  switch (action.type) {
    case alertModalConstants.SUCCESS:
      return {
        type: 'alert-success',
        message: action.message
      };
    case alertModalConstants.ERROR:
      return {
        type: 'alert-danger',
        message: action.message
      };
    case alertModalConstants.CLEAR:
      return {};
    default:
      return state
  }
}