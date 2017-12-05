// Package Functions
// Local Functions
// API Functions (including actions that connect to API)
// Window Functions

// Const
import { MARVEL_CONFIG } from '../config';

export const FETCH_CHARACTERS_REQUEST = 'FETCH_CHARACTERS_REQUEST';
export const FETCH_CHARACTERS_DONE = 'FETCH_CHARACTERS_DONE';
export const FETCH_CHARACTERS_FAILURE = 'FETCH_CHARACTERS_FAILURE';

// Action Creators
export function getCharacters(
  limit = 10,
  page = 1,
  sortBy,
  sortDir,
  search,
  searchBy
) {
  return dispatch => {
    let url = `${MARVEL_CONFIG.apiEndpoint}/characters?apikey=${MARVEL_CONFIG.apiKey}`;
    url =
      limit > 0 && limit <= 100
        ? `${url}&limit=${limit}`
        : `${url}&limit=${10}`;
    url =
      page > 1 ? `${url}&offset=${limit * (page - 1)}` : `${url}&offset=${0}`;
    let parseSort = sortBy;
    parseSort = sortDir === 'desc' ? `-${sortBy}` : sortBy;
    url = parseSort ? `${url}&orderBy=${parseSort}` : url;
    url =
      search && searchBy === 'name' ? `${url}&nameStartsWith=${search}` : url;

    dispatch({
      type: FETCH_CHARACTERS_REQUEST,
    });

    fetch(url)
      .then(response => {
        if (response.status !== 200) {
          dispatch({
            type: FETCH_CHARACTERS_FAILURE,
            payload: {
              isLoading: false,
              errMsg: 'Bad response from server',
            },
          });
        }
        return response.json();
      })
      .then(result => {
        if (result && result.data && result.data.total > -1) {
          dispatch({
            type: FETCH_CHARACTERS_DONE,
            payload: {
              total: result.data.total,
              listData: result.data.results ? result.data.results : [],
            },
          });
        }
      })
      .catch(error => {
        dispatch({
          type: FETCH_CHARACTERS_FAILURE,
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
  total: 0,
  listData: [],
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_CHARACTERS_REQUEST: {
      return Object.assign({}, initialState, {
        isLoading: true,
      });
    }
    case FETCH_CHARACTERS_DONE: {
      return Object.assign({}, state, {
        isLoading: false,
        total: payload.total,
        listData: payload.listData,
      });
    }
    case FETCH_CHARACTERS_FAILURE: {
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
