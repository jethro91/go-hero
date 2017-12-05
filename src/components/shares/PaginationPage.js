import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import parse from 'url-parse';

import { push } from '../../reduxs/routing';

class PaginationPage extends Component {
  constructor(props) {
    super(props);

    this.setPage = this.setPage.bind(this);
    this.pagination = this.pagination.bind(this);
  }
  pagination(c, l) {
    // Fungsi Helper Pembuat array Pagination
    const current = c ? c : 1;
    const firstPage = 1;
    const lastPage = l > 0 ? l : 1;
    const range = [];
    // delta merupakan jarak antar tombol
    const delta = 2;
    // maxbutton harus bernilai ganjil
    const maxButton = 5;
    let left = current - delta > 1 ? current - delta : 1;
    let right = lastPage;
    if (current + delta < lastPage) {
      right = current + delta;
    }
    if (right < maxButton) {
      right = maxButton;
    }
    if (left + current > maxButton) {
      left = right - maxButton + 1;
    }

    if (lastPage < maxButton) {
      // jika page length < 5
      right = lastPage;
      left = 1;
    }

    for (let i = left; i <= right; i++) {
      range.push(i);
    }
    if (range[0] !== firstPage) {
      range[0] = '...';
    }
    if (range[range.length - 1] !== lastPage) {
      range[range.length - 1] = '...';
    }
    return range;
  }
  setPage(selectedPage) {
    const { pushPath, pathname, query, prefix, total, pageSize } = this.props;
    let curShow = pageSize;
    if (query[`${prefix}limit`] && parseInt(query[`${prefix}limit`], 10) > 0) {
      curShow = parseInt(query[`${prefix}limit`], 10);
    }
    const totalPage = Math.ceil(total / curShow);
    if (
      selectedPage < 1 ||
      selectedPage > totalPage ||
      selectedPage === query[`${prefix}page`]
    ) {
      return;
    }
    const newQuery = {};
    newQuery[`${prefix}page`] = selectedPage;
    if (newQuery[`${prefix}page`] === 1) {
      newQuery[`${prefix}page`] = null;
    }
    pushPath(pathname, newQuery, true);
  }
  render() {
    const { query, prefix, total, pageSize } = this.props;
    let curShow = pageSize;
    let curPage = 1;
    if (query[`${prefix}limit`] && parseInt(query[`${prefix}limit`], 10) > 0) {
      curShow = parseInt(query[`${prefix}limit`], 10);
    }
    if (query[`${prefix}page`] && parseInt(query[`${prefix}page`], 10) > 1) {
      curPage = parseInt(query[`${prefix}page`], 10);
    }
    let totalPage = Math.ceil(total / curShow);
    if (total === 0) {
      totalPage = 1;
    }
    const pageBtnArr = this.pagination(curPage, totalPage) || [];
    return (
      <ul className="pagination m-t-none m-b-none">
        <li
          className={
            curPage === 1
              ? 'paginate_button btn-sm  disabled'
              : 'paginate_button btn-sm '
          }
          title={'Ke Halaman 1'}
        >
          <a
            onClick={() => {
              return curPage > 1 ? this.setPage(1) : () => {};
            }}
          >
            <i className="fa fa-angle-double-left" />
          </a>
        </li>
        <li
          className={
            curPage === 1
              ? 'paginate_button btn-sm  disabled'
              : 'paginate_button btn-sm '
          }
          title="Halaman Sebelumnya"
        >
          <a onClick={() => this.setPage(curPage - 1)}>
            <i className="fa fa-angle-left" />
          </a>
        </li>
        {pageBtnArr.map((item, key) => {
          if (key === 0 && item === '...') {
            return (
              <li
                key={key}
                className={
                  item === curPage
                    ? 'paginate_button btn-sm  active'
                    : 'paginate_button btn-sm '
                }
              >
                <a onClick={() => this.setPage(pageBtnArr[key + 1] - 1)}>
                  {item}
                </a>
              </li>
            );
          }
          if (key === pageBtnArr.length - 1 && item === '...') {
            return (
              <li
                key={key}
                className={
                  item === curPage
                    ? 'paginate_button btn-sm  active'
                    : 'paginate_button btn-sm '
                }
              >
                <a
                  onClick={() =>
                    this.setPage(pageBtnArr[pageBtnArr.length - 2] + 1)}
                >
                  {item}
                </a>
              </li>
            );
          }
          return (
            <li
              key={key}
              className={
                item === curPage
                  ? 'paginate_button btn-sm  active'
                  : 'paginate_button btn-sm '
              }
            >
              <a onClick={() => this.setPage(item)}>{item}</a>
            </li>
          );
        })}
        <li
          className={
            curPage === totalPage
              ? 'paginate_button btn-sm  disabled'
              : 'paginate_button btn-sm '
          }
          title="Halaman Selanjutnya"
        >
          <a onClick={() => this.setPage(curPage + 1)}>
            <i className="fa fa-angle-right" />
          </a>
        </li>
        <li
          className={
            curPage === totalPage
              ? 'paginate_button btn-sm  disabled'
              : 'paginate_button btn-sm '
          }
          title={`Ke Halaman ${totalPage}`}
        >
          <a
            onClick={() => {
              return curPage < totalPage ? this.setPage(totalPage) : () => {};
            }}
          >
            <i className="fa fa-angle-double-right" />
          </a>
        </li>
      </ul>
    );
  }
}

PaginationPage.propTypes = {
  query: PropTypes.object.isRequired,
  pushPath: PropTypes.func.isRequired,
  // Cmp Props
  pathname: PropTypes.string,
  total: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  prefix: PropTypes.string,
};
PaginationPage.defaultProps = {
  pathname: '',
  prefix: '',
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
export default connect(mapStateToProps, mapDispatchToProps)(PaginationPage);
