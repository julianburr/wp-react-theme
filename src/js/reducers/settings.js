import axios from 'axios';
import config from '../config';
import store from '../store';
import { LOAD_SETTINGS, LOAD_SETTINGS_SUCCESS, LOAD_SETTINGS_FAILURE, loadSettingsSuccess, loadSettingsFailure } from '../actions/settings';

export const defaultState = null;

export default (state, action) => {
  // Make sure to apply a default state if necessary
  if (typeof state === 'undefined') {
    state = defaultState;
  }
  // Switch case for all possible actions
  switch(action.type) {
    case LOAD_SETTINGS:
      axios.get(`${config.apiUrl}/wp-json/react-api/v1/settings/`)
        .then(response => {
          setTimeout(() => {
            store.dispatch(loadSettingsSuccess(response));
          }, 2000);
        })
        .catch(error => {
          store.dispatch(loadSettingsSuccess(error))
        });
      return state;
    break;

    case LOAD_SETTINGS_SUCCESS:
      console.log('success')
      return action.response.data;
    break;

    case LOAD_SETTINGS_FAILURE:
      console.error('ERROR CAUGHT', action.error);
      return state;
    break;

    default:
      return state;
    break;
  }
};