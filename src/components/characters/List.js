// Package Components/Containers
import React from 'react';
// Package Functions
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Images or Styles
// Local Components
import Search from '../shares/Search';
import SelectSort from '../shares/SelectSort';
import Pagination from '../shares/Pagination';
import Item from './Item';
// Local Functions
// API Functions (including actions that connect to API)
import { getCharacters } from '../../reduxs/charactersAPI';

function List({ query, isLoading, errMsg, total, listData, apiGetCharacters }) {
  return (
    <div>
      <div className="row">
        <div className="col-lg-9">
          <Search>
            <button
              onClick={e => {
                e.preventDefault();
                apiGetCharacters(
                  query.limit,
                  query.page,
                  query.sortBy,
                  query.sortDir,
                  query.search,
                  query.searchBy
                );
              }}
              type="button"
              className="btn btn-sm btn-success"
            >
              <i className="fa fa-refresh" />
            </button>
          </Search>
        </div>
        <div className="col-lg-3">
          <SelectSort
            options={[
              {
                value: 'name',
                label: 'Name',
              },
              {
                value: 'modified',
                label: 'Modified',
              },
            ]}
          />
        </div>
      </div>
      <table className="table table-striped table-responsive jet-align-middle">
        <thead>
          <tr>
            <th width="76" className="text-center">
              Picture
            </th>
            <th width="150" className="text-center">
              Name
            </th>
            <th className="text-center hidden-xs">Descriptoon</th>
            <th width="130" className="text-center">
              Modified
            </th>
          </tr>
        </thead>
        <tbody>
          {errMsg ? (
            <tr>
              <td className="text-center text-danger" colSpan="20">
                {errMsg}
              </td>
            </tr>
          ) : null}

          {!errMsg && isLoading ? (
            <tr>
              <td className="text-center text-sccess" colSpan="20">
                <i className="fa fa-spinner fa-3x fa-spin" />
                <span className="sr-only">Loading...</span>
              </td>
            </tr>
          ) : (
            listData.map(data => {
              return <Item key={data.id} data={data} />;
            })
          )}

          {!errMsg && !isLoading && listData.length < 1 ? (
            <tr>
              <td className="text-center" colSpan="20">
                No Data
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
      <Pagination pageSize={10} total={total} />
    </div>
  );
}

List.propTypes = {
  query: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errMsg: PropTypes.string.isRequired,
  listData: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  apiGetCharacters: PropTypes.func.isRequired,
};
List.defaultProps = {};
function mapStateToProps(state) {
  return {
    query: state.routing.locationBeforeTransitions.query,
    isLoading: state.charactersAPI.isLoading,
    errMsg: state.charactersAPI.errMsg,
    listData: state.charactersAPI.listData,
    total: state.charactersAPI.total,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    apiGetCharacters: (limit, page, sortBy, sortDir, search, searchBy) => {
      dispatch(getCharacters(limit, page, sortBy, sortDir, search, searchBy));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(List);
