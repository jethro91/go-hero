// Package Components/Containers
import React from 'react';
// Package Functions
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Images or Styles
import logo from '../assetsCustom/img/jek.png';
// Local Components
// Local Functions
import { push } from '../reduxs/routing';

function Main({ children, pathname, pushPath }) {
  return (
    <div className="app">
      <div className="app-header">
        GO<img src={logo} className="app-logo" alt="logo" />HERO
        <br />
        <span className="sub-title hidden-xs">
          Instant superhero panic button
        </span>
      </div>
      <div>
        <nav className="navbar navbar-inverse no-radius">
          <div className="container">
            <div>
              <ul className="nav navbar-nav">
                <li
                  className={
                    pathname === '/' || pathname.startsWith('/character')
                      ? 'nav-active'
                      : ''
                  }
                >
                  <a
                    onClick={() => {
                      pushPath('/');
                    }}
                    className="btn-nav text-center"
                  >
                    <i className="fa fa-home" />
                    <br />Home
                  </a>
                </li>
                <li className={pathname === '/history' ? 'nav-active' : ''}>
                  <a
                    onClick={() => {
                      pushPath('/history');
                    }}
                    className="btn-nav text-center"
                  >
                    <i className="fa fa-clock-o" />
                    <br />History
                  </a>
                </li>
                <li className={pathname === '/about' ? 'nav-active' : ''}>
                  <a
                    onClick={() => {
                      pushPath('/about');
                    }}
                    className="btn-nav text-center"
                  >
                    <i className="fa fa-question-circle-o" />
                    <br />About
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      {children}
    </div>
  );
}

Main.propTypes = {
  children: PropTypes.any,
  pathname: PropTypes.string.isRequired,
  pushPath: PropTypes.func.isRequired,
};
Main.defaultProps = {
  children: null,
};
function mapStateToProps(state) {
  return {
    pathname: state.routing.locationBeforeTransitions.pathname,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    pushPath: (pathname, query, preserveOtherQuery) => {
      dispatch(push(pathname, query, preserveOtherQuery));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);
