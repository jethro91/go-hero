// Package Functions
import _ from 'lodash';
import history from '../singleton/history';
// Local Functions
// API Functions (including actions that connect to API)
// Window Functions

// Const
export const ROUTING_NAVIGATION_DONE = 'ROUTING_NAVIGATION_DONE';
export const ROUTING_QUERY_DONE = 'ROUTING_QUERY_DONE';
export const ROUTING_SET_REDIRECT = 'ROUTING_SET_REDIRECT';
export const ROUTING_CLEAR_REDIRECT = 'ROUTING_CLEAR_REDIRECT';

export const ROUTING_WITH_PARAMS = {
  '/character/': ['id'],
};

function pathnameToParams(pathname = '') {
  const params = {};
  if (!pathname) {
    return params;
  }
  _.each(ROUTING_WITH_PARAMS, (paramsDef, pathDef) => {
    if (pathname.startsWith(pathDef)) {
      const paramsStr = pathname.split(pathDef)[1];
      const paramsArr = paramsStr.split('/');
      _.each(paramsDef, (val, idx) => {
        params[val] = paramsArr[idx];
      });
    }
  });
  return params;
}
function searchToQuery(search = '') {
  let arrSearch = search.split('?')[1];
  if (arrSearch) {
    arrSearch = arrSearch.split('&');
  }
  const query = {};
  if (arrSearch && arrSearch.length > 0) {
    _.each(arrSearch, val => {
      const arr = val.split('=');
      const queryParamKey = arr[0];
      const queryParamVal = arr[1];
      query[queryParamKey] = queryParamVal;
    });
  }
  return query;
}
function queryToSearch(query = {}) {
  let search = ``;
  if (Object.keys(query) && Object.keys(query).length > 0) {
    search = `?`;
    _.each(query, (val, key) => {
      if (val !== null) {
        if (search === '?') {
          search += `${key}=${val}`;
        } else {
          search += `&${key}=${val}`;
        }
      }
    });
  }
  return search;
}

// Action Creators
export function setCurrentRoutes() {
  return dispatch => {
    const { pathname } = history.location;
    const { search } = history.location;
    const params = pathnameToParams(pathname);
    const query = searchToQuery(search);
    dispatch({
      type: ROUTING_NAVIGATION_DONE,
      payload: {
        href: pathname + search,
        pathname,
        params,
        query,
      },
    });
  };
}

export function setCurrentRedirect() {
  return dispatch => {
    const { pathname } = history.location;
    const { search } = history.location;
    const params = pathnameToParams(pathname);
    const query = searchToQuery(search);
    dispatch({
      type: ROUTING_SET_REDIRECT,
      payload: {
        href: pathname + search,
        pathname,
        params,
        query,
      },
    });
  };
}

export function push(
  pathname = '',
  query = {},
  preserveOtherQuery = false,
  next = () => {}
) {
  return dispatch => {
    let search = queryToSearch(query);
    let newQuery = query;
    if (preserveOtherQuery) {
      const prevSearch = history.location.search;
      const prevQuery = searchToQuery(prevSearch);
      newQuery = Object.assign(prevQuery, newQuery);
      search = queryToSearch(newQuery);
    }
    _.each(newQuery, (val, key) => {
      if (val === null) {
        delete newQuery[key];
      } else {
        newQuery[key] = `${newQuery[key]}`;
      }
    });

    if (pathname) {
      const params = pathnameToParams(pathname);
      history.push(pathname + search, {});
      next();
      dispatch({
        type: ROUTING_NAVIGATION_DONE,
        payload: {
          href: pathname + search,
          pathname,
          params,
          query: newQuery,
        },
      });
      return;
    }

    history.push(history.location.pathname + search, {});
    next();
    dispatch({
      type: ROUTING_QUERY_DONE,
      payload: {
        query: newQuery,
      },
    });
  };
}
export function replace(
  pathname = '',
  query = {},
  preserveOtherQuery = false,
  next = () => {}
) {
  return dispatch => {
    let search = queryToSearch(query);
    let newQuery = query;
    if (preserveOtherQuery) {
      const prevSearch = history.location.search;
      const prevQuery = searchToQuery(prevSearch);
      newQuery = Object.assign(prevQuery, newQuery);
      search = queryToSearch(newQuery);
    }

    _.each(newQuery, (val, key) => {
      if (val === null) {
        delete newQuery[key];
      } else {
        newQuery[key] = `${newQuery[key]}`;
      }
    });

    if (pathname) {
      const params = pathnameToParams(pathname);
      history.push(pathname + search, {});
      next();
      dispatch({
        type: ROUTING_NAVIGATION_DONE,
        payload: {
          href: pathname + search,
          pathname,
          params,
          query: newQuery,
        },
      });
      return;
    }

    history.push(history.location.pathname + search, {});
    next();
    dispatch({
      type: ROUTING_QUERY_DONE,
      payload: {
        query: newQuery,
      },
    });
  };
}

// Reducer
const initialState = {
  locationBeforeTransitions: {
    href: '',
    pathname: '',
    params: {},
    query: {},
  },
  redirect: {
    href: '/',
    pathname: '/',
    params: {},
    query: {},
  },
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case ROUTING_NAVIGATION_DONE: {
      return Object.assign({}, state, {
        locationBeforeTransitions: {
          href: payload.href,
          pathname: payload.pathname,
          params: payload.params,
          query: payload.query,
        },
      });
    }
    case ROUTING_QUERY_DONE: {
      return Object.assign({}, state, {
        locationBeforeTransitions: {
          href: state.locationBeforeTransitions.href,
          pathname: state.locationBeforeTransitions.pathname,
          params: state.locationBeforeTransitions.params,
          query: payload.query,
        },
      });
    }
    case ROUTING_SET_REDIRECT: {
      return Object.assign({}, state, {
        redirect: payload,
      });
    }
    case ROUTING_CLEAR_REDIRECT: {
      return Object.assign({}, state, {
        redirect: {
          href: '/',
          pathname: '/',
          params: {},
          query: {},
        },
      });
    }
    default: {
      return state;
    }
  }
}
