import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PaginationShow from './PaginationShow';
import PaginationPage from './PaginationPage';

class Pagination extends Component {
  render() {
    const { pathname, prefix, total, pageSize, pageOptions } = this.props;
    return (
      <div className="row">
        <div className="col-sm-9">
          <PaginationPage
            pathname={pathname}
            prefix={prefix}
            total={total}
            pageSize={pageSize}
          />
        </div>
        <div className="col-sm-3">
          <PaginationShow
            pathname={pathname}
            prefix={prefix}
            total={total}
            pageSize={pageSize}
            pageOptions={pageOptions}
          />
        </div>
      </div>
    );
  }
}

Pagination.propTypes = {
  // Cmp Props
  pathname: PropTypes.string,
  total: PropTypes.number,
  pageSize: PropTypes.number.isRequired,
  prefix: PropTypes.string,
  pageOptions: PropTypes.array,
};
Pagination.defaultProps = {
  pathname: '',
  total: 0,
  prefix: '',
  pageOptions: ['10', '25', '50', '75', '100'],
};

export default Pagination;
