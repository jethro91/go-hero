// Package Components/Containers
import React, { Component } from 'react';
// Package Functions
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Images or Styles
// Local Components
import List from '../components/characters/List';
// Local Functions
// API Functions (including actions that connect to API)
import { getCharacters } from '../reduxs/charactersAPI';
// Window Functions

class PageHome extends Component {
  constructor(props) {
    super(props);
    this.page = {
      appName: 'GO-HERO',
      title: 'Home',
      desc: 'Choose Hero and Call',
    };
  }
  componentWillMount() {
    document.title = `${this.page.title} | ${this.page.appName}`;
    const metaList = document.head.getElementsByTagName('meta');
    metaList[5].content = this.page.desc;

    const { query, apiGetCharacters } = this.props;
    apiGetCharacters(
      query.limit,
      query.page,
      query.sortBy,
      query.sortDir,
      query.search,
      query.searchBy
    );
  }
  componentDidUpdate(prevProps) {
    const prevQuery = prevProps.query;
    const { query, apiGetCharacters } = this.props;
    let doReload = false;
    doReload = prevQuery.limit !== query.limit ? true : doReload;
    doReload = prevQuery.page !== query.page ? true : doReload;
    doReload = prevQuery.sortBy !== query.sortBy ? true : doReload;
    doReload = prevQuery.sortDir !== query.sortDir ? true : doReload;
    doReload = prevQuery.search !== query.search ? true : doReload;
    doReload = prevQuery.searchBy !== query.searchBy ? true : doReload;
    if (doReload) {
      apiGetCharacters(
        query.limit,
        query.page,
        query.sortBy,
        query.sortDir,
        query.search,
        query.searchBy
      );
    }
  }
  render() {
    return (
      <div className="page-wrapper">
        <div className="text-center">
          <h3 className="page-header m-none">{this.page.title}</h3>
          {this.page.desc}
        </div>
        <List />
      </div>
    );
  }
}

PageHome.propTypes = {
  query: PropTypes.object.isRequired,
  apiGetCharacters: PropTypes.func.isRequired,
  // children: PropTypes.any,
};
PageHome.defaultProps = {
  // children: null,
};
function mapStateToProps(state) {
  return { query: state.routing.locationBeforeTransitions.query };
}
function mapDispatchToProps(dispatch) {
  return {
    apiGetCharacters: (limit, page, sortBy, sortDir, search, searchBy) => {
      dispatch(getCharacters(limit, page, sortBy, sortDir, search, searchBy));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(PageHome);
