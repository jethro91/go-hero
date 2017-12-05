// Package Functions
// Local Functions
// API Functions (including actions that connect to API)
// Window Functions

// Const
import { MARVEL_CONFIG } from '../config';

export const FETCH_CHARACTER_REQUEST = 'FETCH_CHARACTER_REQUEST';
export const FETCH_CHARACTER_DONE = 'FETCH_CHARACTER_DONE';
export const FETCH_CHARACTER_FAILURE = 'FETCH_CHARACTER_FAILURE';

// Action Creators
export function getCharacter(id) {
  return dispatch => {
    if (!id) {
      dispatch({
        type: FETCH_CHARACTER_FAILURE,
        payload: {
          errMsg: `Character ID not defined`,
        },
      });
    }
    const url = `${MARVEL_CONFIG.apiEndpoint}/characters/${id}?apikey=${MARVEL_CONFIG.apiKey}`;

    dispatch({
      type: FETCH_CHARACTER_REQUEST,
    });

    fetch(url)
      .then(response => {
        if (response.status !== 200) {
          dispatch({
            type: FETCH_CHARACTER_FAILURE,
            payload: {
              isLoading: false,
              errMsg: 'Bad response from server',
            },
          });
        }
        return response.json();
      })
      .then(result => {
        if (result && result.data && result.data.total && result.data.results) {
          dispatch({
            type: FETCH_CHARACTER_DONE,
            payload: result.data.results[0],
          });
        } else {
          dispatch({
            type: FETCH_CHARACTER_DONE,
            payload: {
              id: 0,
              name: 'No Data',
            },
          });
        }
      })
      .catch(error => {
        dispatch({
          type: FETCH_CHARACTER_FAILURE,
          payload: {
            errMsg: `Looks like there was a problem: \n${error}`,
          },
        });
      });
  };
}

// Reducer
const initialState = {
  isLoading: false,
  errMsg: '',
  data: {},
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_CHARACTER_REQUEST: {
      return Object.assign({}, initialState, {
        isLoading: true,
      });
    }
    case FETCH_CHARACTER_DONE: {
      return Object.assign({}, state, {
        isLoading: false,
        data: payload,
      });
    }
    case FETCH_CHARACTER_FAILURE: {
      return Object.assign({}, state, {
        isLoading: false,
        errMsg: payload.errMsg,
      });
    }
    default: {
      return state;
    }
  }
}
