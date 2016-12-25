import axios from 'axios';
import config from '../config';
import store from '../store';
import { LOAD_CONTENT, LOAD_CONTENT_SUCCESS, LOAD_CONTENT_FAILURE, loadContentSuccess, loadContentFailure } from '../actions/content';

export const defaultState = null;

export default (state, action) => {
  // Make sure to apply a default state if necessary
  if (typeof state === 'undefined') {
    state = defaultState;
  }
  // Switch case for all possible actions
  switch(action.type) {
    case LOAD_CONTENT:
      console.log('state', state, action)
      if (state && state.slug === action.slug) {
        console.log('no need for ajax call!')
        return state;
      }
      axios.get(`${config.apiUrl}/wp-json/react-api/v1/content?slug=${action.slug}`)
        .then(response => {
          setTimeout(() => {
            store.dispatch(loadContentSuccess(response));
          }, 2000);
        })
        .catch(error => {
          store.dispatch(loadContentSuccess(error))
        });
      return defaultState;
    break;

    case LOAD_CONTENT_SUCCESS:
      console.log('success')
      return action.response.data;
    break;

    case LOAD_CONTENT_FAILURE:
      console.error('ERROR CAUGHT', action.error);
      return state;
    break;

    default:
      return state;
    break;
  }
};