import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Import reducers
import settings from './settings';
import content from './content';
import list from './list';

export default combineReducers({ 
  settings,
  content,
  list,
  routing: routerReducer
});