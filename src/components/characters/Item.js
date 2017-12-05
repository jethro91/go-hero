// Package Components/Containers
import React from 'react';
// Package Functions
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Images or Styles
import marvelPlaceholder from '../../assetsCustom/img/marv.jpg';
// Local Components
// Local Functions
import moment from '../../singleton/moment';
import { push } from '../../reduxs/routing';

function Item({ pushPath, data }) {
  return (
    <tr>
      <td>
        <img
          className="img-thumb"
          src={
            data.thumbnail &&
            data.thumbnail.path &&
            data.thumbnail.extension &&
            !data.thumbnail.path.includes('image_not_available')
              ? `${data.thumbnail.path}.${data.thumbnail.extension}`
              : marvelPlaceholder
          }
          alt={data.name}
        />
      </td>
      <td>
        <a
          onClick={() => {
            pushPath(`/character/${data.id}`, {}, true);
          }}
        >
          {data.name}
        </a>
      </td>
      <td className="hidden-xs">{data.description}</td>
      <td
        title={moment(data.modified).format('DD MMM YYYY HH:mm')}
        className="text-center"
      >
        {moment(data.modified).fromNow()}
      </td>
    </tr>
  );
}

Item.propTypes = {
  pushPath: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};
Item.defaultProps = {};
function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {
    pushPath: (pathname, query, preserveOtherQuery) => {
      dispatch(push(pathname, query, preserveOtherQuery));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Item);
