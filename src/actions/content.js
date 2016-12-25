export const LOAD_CONTENT = 'wp/react/LOAD_CONTENT';
export const LOAD_CONTENT_SUCCESS = 'wp/react/LOAD_CONTENT@SUCCESS';
export const LOAD_CONTENT_FAILURE = 'wp/react/LOAD_CONTENT@FAILURE';

export const loadContent = (slug) => {
  return {
    type: LOAD_CONTENT,
    slug
  }
}

export const loadContentSuccess = (response) => {
  return {
    type: LOAD_CONTENT_SUCCESS,
    response
  }
}

export const loadContentFilure = (error) => {
  return {
    type: LOAD_CONTENT_FAILURE,
    error
  }
}