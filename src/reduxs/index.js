// Package Functions
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
// Reducers
import routing from './routing';
import charactersAPI from './charactersAPI';
import characterAPI from './characterAPI';
import heroOTW from './heroOTW';

const reducer = combineReducers({
  routing,
  charactersAPI,
  characterAPI,
  heroOTW,
});

const configureStore = initialState => {
  const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(
    createStore
  );
  const store = createStoreWithMiddleware(
    reducer,
    initialState,
    window.devToolsExtension && window.devToolsExtension()
  );

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      // Enable Webpack hot module replacement for reducers
      module.hot.accept(reducer, () => {
        const nextRootReducer = reducer;
        store.replaceReducer(nextRootReducer);
      });
    }
  }

  return {
    ...store,
  };
};

export default configureStore;
