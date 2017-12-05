// Package Components/Containers
import React, { Component } from 'react';
// Package Functions
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Images or Styles
// Local Components
import Content from '../components/character/Content';
// Local Functions
import { push } from '../reduxs/routing';
// API Functions (including actions that connect to API)
import { getCharacter } from '../reduxs/characterAPI';
// Window Functions

class PageCharacter extends Component {
  constructor(props) {
    super(props);
    this.page = {
      appName: 'GO-HERO',
      title: 'Character',
      desc: '',
    };
  }
  componentWillMount() {
    document.title = `${this.page.title} | ${this.page.appName}`;
    const metaList = document.head.getElementsByTagName('meta');
    metaList[5].content = this.page.desc;
    const { params, apiGetCharacter } = this.props;
    apiGetCharacter(params.id);
  }
  componentWillReceiveProps(nextProps) {
    this.page.title =
      nextProps.data && nextProps.data.name ? nextProps.data.name : 'Character';
    this.page.desc =
      nextProps.data && nextProps.data.description
        ? nextProps.data.description
        : '';
    document.title = `${this.page.title} | ${this.page.appName}`;
    const metaList = document.head.getElementsByTagName('meta');
    metaList[5].content = this.page.desc;
  }
  render() {
    const { isLoading, errMsg } = this.props;
    return (
      <div className="page-wrapper">
        <div className="text-center">
          <h3 className="page-header m-none">{this.page.title}</h3>
          {this.page.desc}
        </div>
        {errMsg ? (
          <div className="text-center">
            <span className="text-danger">{errMsg}</span>
          </div>
        ) : null}
        {!errMsg && isLoading ? (
          <div className="text-center">
            <i className="fa fa-spinner fa-4x fa-spin" />
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <Content />
        )}
      </div>
    );
  }
}

PageCharacter.propTypes = {
  params: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errMsg: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  apiGetCharacter: PropTypes.func.isRequired,
  // children: PropTypes.any,
};
PageCharacter.defaultProps = {
  // children: null,
};
function mapStateToProps(state) {
  return {
    params: state.routing.locationBeforeTransitions.params,
    isLoading: state.characterAPI.isLoading,
    errMsg: state.characterAPI.errMsg,
    data: state.characterAPI.data,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    apiGetCharacter: id => {
      dispatch(getCharacter(id));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(PageCharacter);
