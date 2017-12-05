// Package Components/Containers
import React, { Component } from 'react';
// Package Functions
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import history from '../singleton/history';
// Local Pages
import LayoutMain from '../layouts/Main';

import LayoutBlank from '../layouts/Blank';
// Local Functions
import { setCurrentRoutes } from '../reduxs/routing';
import routesMain from './main';

// API Functions (including actions that connect to API)
// Window Functions

class Routes extends Component {
  componentWillMount() {
    const { setRoutes } = this.props;

    setRoutes();
    this.historyUnlisten = history.listen((location, action) => {
      // History Listener for back and forward
      if (action === 'POP') {
        setRoutes();
      }
    });
  }
  componentWillUnmount() {
    this.historyUnlisten();
  }
  render() {
    const { routing } = this.props;
    const { pathname, params, query } = routing.locationBeforeTransitions;

    let renderRoutes = null;

    renderRoutes = routesMain(renderRoutes, pathname, params, query);

    if (!renderRoutes) {
      return <LayoutBlank />;
    }
    return <LayoutMain>{renderRoutes}</LayoutMain>;
  }
}

Routes.propTypes = {
  // children: PropTypes.any,
  routing: PropTypes.object.isRequired,
  setRoutes: PropTypes.func.isRequired,
};

Routes.defaultProps = {
  // children: null,
};

function mapStateToProps(state) {
  return { routing: state.routing };
}

function mapDispatchToProps(dispatch) {
  return {
    setRoutes: () => {
      dispatch(setCurrentRoutes());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
