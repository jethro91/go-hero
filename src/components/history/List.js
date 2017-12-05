// Package Components/Containers
import React from 'react';
// Package Functions
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Images or Styles
// Local Components
import Item from './Item';
// Local Functions
// API Functions (including actions that connect to API)

function List({ listDataObj }) {
  const listData = Object.keys(listDataObj);
  listData.reverse();
  return (
    <div>
      <table className="table table-striped table-responsive jet-align-middle">
        <thead>
          <tr>
            <th width="150" className="text-center">
              Name
            </th>
            <th width="200" className="text-center">
              Status
            </th>
            <th width="200" className="text-center">
              Request At
            </th>
          </tr>
        </thead>
        <tbody>
          {listData.map(id => {
            return <Item key={id} data={listDataObj[id]} />;
          })}

          {listData.length < 1 ? (
            <tr>
              <td className="text-center" colSpan="20">
                No Data
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}

List.propTypes = {
  listDataObj: PropTypes.object.isRequired,
};
List.defaultProps = {};
function mapStateToProps(state) {
  return {
    listDataObj: state.heroOTW,
  };
}
function mapDispatchToProps(dispatch) {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(List);
