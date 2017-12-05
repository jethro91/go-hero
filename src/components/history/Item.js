// Package Components/Containers
import React, { Component } from 'react';
// Package Functions
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Images or Styles
import marvelPlaceholder from '../../assetsCustom/img/marv.jpg';
// Local Components
// Local Functions
import moment from '../../singleton/moment';

class Item extends Component {
  componentWillReceiveProps(nextProps) {}
  shouldComponentUpdate() {
    return true;
  }
  render() {
    const { data, listDataObj } = this.props;
    const realTimeData = listDataObj[data.id];
    let uiStatus = null;
    uiStatus =
      realTimeData.status === 30 ? (
        <span className="label label-warning">
          <i className="fa fa-spinner fa-spin m-r-sm" />REQUESTED
        </span>
      ) : (
        uiStatus
      );
    uiStatus =
      realTimeData.status === 31 ? (
        <span className="label label-danger">REJECTED</span>
      ) : (
        uiStatus
      );
    uiStatus =
      realTimeData.status === 32 ? (
        <span className="label label-info">
          <i className="fa fa-spinner fa-spin m-r-sm" />ON MY WAY
        </span>
      ) : (
        uiStatus
      );
    uiStatus =
      realTimeData.status === 33 ? (
        <span className="label label-success">SUCCESS</span>
      ) : (
        uiStatus
      );
    return (
      <tr>
        <td className="text-center">
          <img
            className="img-thumb"
            src={
              data.imgPath && !data.imgPath.includes('image_not_available')
                ? data.imgPath
                : marvelPlaceholder
            }
            alt={data.name}
          />
          <div>{data.name}</div>
        </td>
        <td className="text-center">{uiStatus}</td>
        <td
          title={moment(data.requestAt).format('DD MMM YYYY HH:mm')}
          className="text-center"
        >
          {moment(data.requestAt).fromNow()}
        </td>
      </tr>
    );
  }
}

Item.propTypes = {
  data: PropTypes.object.isRequired,
  listDataObj: PropTypes.object.isRequired,
};
Item.defaultProps = {};
function mapStateToProps(state) {
  return {
    listDataObj: state.heroOTW,
  };
}
function mapDispatchToProps(dispatch) {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(Item);
