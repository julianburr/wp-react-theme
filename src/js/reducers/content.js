import axios from 'axios';
import moment from 'moment';
import config from '../config';
import store from '../store';
import { 
  LOAD_CONTENT, 
  LOAD_CONTENT_SUCCESS, 
  LOAD_CONTENT_FAILURE, 
  loadContentSuccess, 
  loadContentFailure 
} from '../actions/content';

export const defaultState = {
  isLoading: false,
  data: {},
  all: {},
  error: null
};

export default (state, action) => {
  // Make sure to apply a default state if necessary
  if (typeof state === 'undefined') {
    state = defaultState;
  }
  // Switch case for all possible actions
  switch(action.type) {
    case LOAD_CONTENT:
      if (state.data.slug && state.data.slug === action.slug) {
        // The requested content is the same that is currently in the store!
        // So no further actions required
        return state;
      } else if (state.all[action.slug]) { // <- TODO: add TTL check here!
        // We already loaded this content before, so return it from there
        // This is the attempt to minimize API requests
        // Needs to work together with sensable TTLs though...
        return {
          ...state,
          data: {...state.all[action.slug].data},
          isLoading: false,
          error: null
        }
      }

      axios.get(`${config.apiUrl}/wp-json/react-api/v1/content?slug=${action.slug}`)
        .then(response => {
          store.dispatch(loadContentSuccess(response));
        })
        .catch(error => {
          store.dispatch(loadContentFailure(error))
        });

      return {
        ...state,
        isLoading: true,
        data: {},
        error: null
      };
    break;

    case LOAD_CONTENT_SUCCESS:
      // AJAX request was successful
      // Add loaded data to store, for both current content as well as
      //  `all` which is basically a simple redux store cache :)
      const { data } = action.response;
      if (!data || !data.slug) {
        // Something is wrong with the loaded data
        return {
          ...state,
          isLoading: false,
          data: null,
          error: {
            message: 'Invalid data loaded!'
          }
        };
      }

      let addData = {};
      addData[data.slug] = {
        data,
        loaded: moment(),
        ttl: data.ttl || 0 // If no TTL is defined by the response, don't use this cache (?)
      };

      return {
        isLoading: false,
        data,
        error: null,
        all: { ...state.all, ...addData }
      };
    break;

    case LOAD_CONTENT_FAILURE:
      // AJAX call failed
      console.error('ERROR CAUGHT', action.error);
      return {
        ...state,
        isLoading: false,
        data: {},
        error: action.error
      };
    break;

    default:
      return state;
    break;
  }
};