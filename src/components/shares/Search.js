import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { push } from '../../reduxs/routing';

class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.cmpRefs = {};
    this.cleartext = this.cleartext.bind(this);
    this.submit = this.submit.bind(this);
  }
  componentDidMount() {
    const { query } = this.props;
    const { searchText } = this.cmpRefs;
    if (query.search) {
      searchText.value = query.search.trim();
    }
  }
  cleartext() {
    const { pushPath } = this.props;
    const newQuery = {};
    const { searchText } = this.cmpRefs;
    searchText.value = null;
    newQuery.searchBy = null;
    newQuery.search = null;
    newQuery.page = null;
    pushPath(null, newQuery, true);
  }
  submit(e) {
    e.preventDefault();
    const { query, pushPath, searchBy } = this.props;
    const newQuery = Object.assign({}, query);
    const { searchText } = this.cmpRefs;
    newQuery.searchBy = searchBy;
    newQuery.search = searchText.value.trim();
    newQuery.page = null;
    pushPath(null, newQuery, true);
  }
  render() {
    const { children } = this.props;
    return (
      <form onSubmit={this.submit} className="form-inline" title="Cari">
        <div className="form-group">
          <div className="input-group">
            <div onClick={this.cleartext} className="input-icon right">
              <i className="fa fa-times sm" />
            </div>
            <input
              ref={c => {
                this.cmpRefs.searchText = c;
              }}
              placeholder="Search ..."
              type="text"
              className="input-sm form-control"
            />
            <span className="input-group-btn">
              <button type="submit" className="btn btn-sm btn-info">
                <i className="fa fa-search" />
              </button>
              {children}
            </span>
          </div>
        </div>
      </form>
    );
  }
}

SearchInput.propTypes = {
  query: PropTypes.object.isRequired,
  pushPath: PropTypes.func.isRequired,
  children: PropTypes.any,
  searchBy: PropTypes.string,
};

SearchInput.defaultProps = {
  children: null,
  searchBy: 'name',
};
function mapStateToProps(state) {
  return {
    query: state.routing.locationBeforeTransitions.query,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    pushPath: (pathname, query, preserveOtherQuery) => {
      dispatch(push(pathname, query, preserveOtherQuery));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);
