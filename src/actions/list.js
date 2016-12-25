export const LOAD_LIST = 'wp/react/LOAD_LIST';
export const LOAD_LIST_SUCCESS = 'wp/react/LOAD_LIST@SUCCESS';
export const LOAD_LIST_FAILURE = 'wp/react/LOAD_LIST@FAILURE';

export const loadList = (args) => {
  return {
    type: LOAD_LIST,
    args
  }
}

export const loadListSuccess = (response) => {
  return {
    type: LOAD_LIST_SUCCESS,
    response
  }
}

export const loadListFilure = (error) => {
  return {
    type: LOAD_LIST_FAILURE,
    error
  }
}