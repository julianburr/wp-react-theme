import axios from 'axios';
import crypto from 'crypto';
import moment from 'moment';
import config from '../config';
import store from '../store';
import { LOAD_LIST, LOAD_LIST_SUCCESS, LOAD_LIST_FAILURE, loadListSuccess, loadListFailure } from '../actions/list';

export const defaultState = {
  isLoading: false,
  data: {},
  error: null,
  all: {}
};

export default (state, action) => {
  // Make sure to apply a default state if necessary
  if (typeof state === 'undefined') {
    state = defaultState;
  }
  // Switch case for all possible actions
  switch(action.type) {
    case LOAD_LIST:
      // Put together parameter string
      let apiQuery = '';
      let hash = null;
      action.query = {
        foo: 'bar'
      };
      if (action.query) {
        let params = [];
        for (let key in action.query) {
          params.push(`${key}=${action.query[key]}`);
        }
        // Create hash from parameter string
        // That way we can refer to this request to check for cached data
        apiQuery = params.join('&');
        hash = crypto.createHash('md5').update(apiQuery).digest("hex");
        apiQuery += `&hash=${hash}`;
      }

      if (hash && state.data && state.data.hash && state.data.hash === hash) {
        // The requested list is already loaded in the state
        // No further actions required
        return state;
      } else if (state.all[hash]) { // <- TODO: add check for TTL
        // We loaded the list before, so use cached data from store
        return {
          ...state,
          isLoading: false,
          data: {...state.all[hash].data},
          error: null
        };
      }
      
      axios.get(`${config.apiUrl}/wp-json/wp/v2/posts?${apiQuery}`)
        .then(response => {
          setTimeout(() => {
            // TODO: change API, for now just return no hash and list manually
            store.dispatch(loadListSuccess({ 
              data: { 
                hash: false, 
                posts: [...response.data]
              }
            }));
          }, 2000);
        })
        .catch(error => {
          store.dispatch(loadListFailure(error))
        });
      return {
        ...state,
        isLoading: true,
        data: {},
        error: null
      };
    break;

    case LOAD_LIST_SUCCESS:
      // AJAX request was successful
      // Save data both in `all` store cache as well as the current list store value
      const { data } = action.response;
      if (!data) {
        return {
          ...state,
          isLoading: false,
          data: {},
          error: {
            message: 'Invalid API response!',
            details: 'No data found in response'
          }
        };
      }

      let addData = {};
      if (data.hash) {
        // If hash provided in API response, save data in store cache
        addData[data.hash] = {
          data,
          loaded: moment(),
          ttl: data.ttl || 0
        };
      }

      console.log('check if we ever get here')

      return {
        ...state,
        isLoading: false,
        data,
        error: null,
        all: { ...state.all, ...addData }
      };
    break;

    case LOAD_LIST_FAILURE:
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