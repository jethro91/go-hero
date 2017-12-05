import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import registerServiceWorker from './registerServiceWorker';
import configureStore from './reduxs';

import Routes from './routes';

// Vendor Styles
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/css/bootstrap-theme.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
// Custom Styles
import './assetsCustom/css/index.css';
import './assetsCustom/css/layout.css';
import './assetsCustom/css/removeDefault.css';
import './assetsCustom/css/inputCustom.css';
import './assetsCustom/css/wrapper.css';
import './assetsCustom/css/margin.css';
import './assetsCustom/css/border.css';
import './assetsCustom/css/padding.css';

const store = configureStore();
ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
