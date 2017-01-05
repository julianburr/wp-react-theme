export const LOAD_SETTINGS = 'wp/react/LOAD_SETTINGS';
export const LOAD_SETTINGS_SUCCESS = 'wp/react/LOAD_SETTINGS@SUCCESS';
export const LOAD_SETTINGS_FAILURE = 'wp/react/LOAD_SETTINGS@FAILURE';

export const loadSettings = () => {
  return {
    type: LOAD_SETTINGS
  }
}

export const loadSettingsSuccess = (response) => {
  return {
    type: LOAD_SETTINGS_SUCCESS,
    response
  }
}

export const loadSettingsFilure = (error) => {
  return {
    type: LOAD_SETTINGS_FAILURE,
    error
  }
}