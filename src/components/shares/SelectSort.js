import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import { push } from '../../reduxs/routing';

class SelectSort extends Component {
  constructor(props) {
    super(props);
    this.onChangeSelect = this.onChangeSelect.bind(this);
    this.toggleSortDirAsc = this.toggleSortDirAsc.bind(this);
    this.toggleSortDirDesc = this.toggleSortDirDesc.bind(this);
  }

  onChangeSelect(e) {
    const { query, pushPath } = this.props;
    const sortBy = e.target.value;
    const sortDir = query.sortDir || 'asc';
    const newQuery = _.clone(query);

    if (sortBy) {
      newQuery.sortBy = sortBy;
      if (sortDir && sortDir === 'desc') {
        newQuery.sortDir = sortDir;
      } else {
        newQuery.sortDir = null;
      }
    } else {
      newQuery.sortBy = null;
      newQuery.sortDir = null;
    }

    pushPath(null, newQuery, true);
  }
  toggleSortDirAsc() {
    const { query, pushPath } = this.props;
    const newQuery = _.clone(query);
    if (newQuery) {
      newQuery.sortDir = null;
      pushPath(null, newQuery, true);
    }
  }
  toggleSortDirDesc() {
    const { query, pushPath } = this.props;
    const newQuery = _.clone(query);
    if (newQuery && newQuery['sortBy']) {
      newQuery['sortDir'] = 'desc';
      pushPath(null, newQuery, true);
    }
  }
  render() {
    const { query, options } = this.props;
    let sortDir = (
      <button
        type="button"
        className="btn btn-default btn-sm"
        onClick={this.toggleSortDirDesc}
      >
        <i className="fa fa-sort-amount-asc" />
      </button>
    );
    if (query.sortDir === 'desc') {
      sortDir = (
        <button
          type="button"
          className="btn btn-default btn-sm"
          onClick={this.toggleSortDirAsc}
        >
          <i className="fa fa-sort-amount-desc" />
        </button>
      );
    }
    return (
      <div className="input-group">
        <select
          className="form-control input-sm"
          value={query.sortBy ? query.sortBy : ''}
          onChange={this.onChangeSelect}
        >
          <option value="">--Sort By--</option>
          {options.map(item => {
            return (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            );
          })}
        </select>
        <span className="input-group-btn">{sortDir}</span>
      </div>
    );
  }
}

SelectSort.propTypes = {
  query: PropTypes.object.isRequired,
  pushPath: PropTypes.func.isRequired,
  // Cmp Props
  options: PropTypes.array,
};
SelectSort.defaultProps = {
  options: [],
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
export default connect(mapStateToProps, mapDispatchToProps)(SelectSort);
