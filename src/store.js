import { createStore } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import rootReducer from './reducers';

import { defaultState as settings } from './reducers/settings';
import { defaultState as list } from './reducers/list';
import { defaultState as content } from './reducers/content';

const defaultState = {
  settings,
  list,
  content
};

const store = createStore(rootReducer, defaultState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export const history = syncHistoryWithStore(browserHistory, store);

export default store;