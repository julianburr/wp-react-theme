import axios from 'axios';
import config from '../config';
import store from '../store';
import { LOAD_LIST, LOAD_LIST_SUCCESS, LOAD_LIST_FAILURE, loadListSuccess, loadListFailure } from '../actions/list';

export const defaultState = null;

export default (state, action) => {
  // Make sure to apply a default state if necessary
  if (typeof state === 'undefined') {
    state = defaultState;
  }
  // Switch case for all possible actions
  switch(action.type) {
    case LOAD_LIST:
      axios.get(`${config.apiUrl}/wp-json/wp/v2/posts`)
        .then(response => {
          setTimeout(() => {
            store.dispatch(loadListSuccess(response));
          }, 2000);
        })
        .catch(error => {
          store.dispatch(loadListSuccess(error))
        });
      return state;
    break;

    case LOAD_LIST_SUCCESS:
      console.log('success')
      return action.response.data;
    break;

    case LOAD_LIST_FAILURE:
      console.error('ERROR CAUGHT', action.error);
      return state;
    break;

    default:
      return state;
    break;
  }
};