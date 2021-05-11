import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { articles } from './articles.reducer';
import { alert } from './alert.reducer';
import { alertModal } from './alertModal.reducer';
import { upload } from './upload.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  articles,
  alert,
  upload,
  alertModal
});

export default rootReducer;