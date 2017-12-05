import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import parse from 'url-parse';
import _ from 'lodash';

import { push } from '../../reduxs/routing';

class PaginationShow extends Component {
  constructor(props) {
    super(props);

    this.changeShow = this.changeShow.bind(this);
  }

  changeShow(e) {
    const { pushPath, pathname, query, prefix, pageSize } = this.props;
    const newQuery = _.clone(query);
    newQuery[`${prefix}limit`] = parseInt(e.target.value, 10);
    if (newQuery[`${prefix}limit`] === pageSize) {
      newQuery[`${prefix}limit`] = null;
    }
    newQuery[`${prefix}page`] = null;
    pushPath(pathname, newQuery, true);
  }
  render() {
    const { query, prefix, total, pageSize, pageOptions } = this.props;
    let curShow = pageSize;
    if (query[`${prefix}limit`] && parseInt(query[`${prefix}limit`], 10) > 0) {
      curShow = parseInt(query[`${prefix}limit`], 10);
    }
    let curPage = 1;
    let idxStart = 1;
    if (query[`${prefix}page`] && parseInt(query[`${prefix}page`], 10) > 1) {
      curPage = parseInt(query[`${prefix}page`], 10);
      idxStart = parseInt(query[`${prefix}page`] - 1, 10) * curShow + 1;
    }

    if (total === 0) {
      idxStart = 0;
    }
    const idxEnd = curPage * curShow < total ? curPage * curShow : total;
    return (
      <div className="jet-show pull-right" title="Tampilkan">
        <div className="input-group pull-right">
          <select
            onChange={this.changeShow}
            className="form-control input-sm"
            defaultValue={curShow}
          >
            {pageOptions.map((item, key) => {
              return (
                <option key={key} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
          <span className="input-group-btn ">
            <button className="btn btn-sm btn-default">
              Item&nbsp;<b>{idxStart}</b>-<b>{idxEnd}</b>&nbsp;fom&nbsp;<b>{total}</b>&nbsp;
            </button>
          </span>
        </div>
      </div>
    );
  }
}

PaginationShow.propTypes = {
  pushPath: PropTypes.func.isRequired,
  query: PropTypes.any.isRequired,
  // Cmp Props
  pathname: PropTypes.string,
  total: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  prefix: PropTypes.string,
  pageOptions: PropTypes.array,
};
PaginationShow.defaultProps = {
  pathname: '',
  prefix: '',
  pageOptions: ['5', '10', '15', '20', '25'],
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
export default connect(mapStateToProps, mapDispatchToProps)(PaginationShow);
