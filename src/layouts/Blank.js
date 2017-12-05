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

function Blank({ pushPath }) {
  return (
    <div className="app">
      <div className="app-header">
        GO<img src={logo} className="app-logo" alt="logo" />HERO
        <br />
        <span className="sub-title hidden-xs">
          Instant superhero panic button
        </span>
      </div>
      <h1 className="text-center">404</h1>
      <h4 className="text-center">Page Not Found</h4>
      <button
        onClick={() => {
          pushPath('/');
        }}
        type="button"
        className="btn btn-success"
      >
        HOME
      </button>
    </div>
  );
}

Blank.propTypes = {
  pushPath: PropTypes.func.isRequired,
};
Blank.defaultProps = {};
function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {
    pushPath: (pathname, query, preserveOtherQuery) => {
      dispatch(push(pathname, query, preserveOtherQuery));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Blank);
