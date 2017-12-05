// Package Components/Containers
import React from 'react';
// Package Functions
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Images or Styles
import marvelPlaceholder from '../../assetsCustom/img/marv.jpg';
// Local Components
import Action from './Action';
// Local Functions

function Content({ data }) {
  return (
    <div className="m-t-sm">
      <img
        className="img-character center-block m-b-sm"
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
      <Action />
      <div className="row">
        <div className="col-md-6">
          <h3>Comics</h3>
          {data.comics && data.comics.items && data.comics.items.length > 0 ? (
            <ul>
              {data.comics.items.map(item => {
                return <li key={item.resourceURI}>{item.name}</li>;
              })}
            </ul>
          ) : (
            'Comics Not Available'
          )}
        </div>
        <div className="col-md-6">
          <h3>Series</h3>
          {data.series && data.series.items && data.series.items.length > 0 ? (
            <ul>
              {data.series.items.map(item => {
                return <li key={item.resourceURI}>{item.name}</li>;
              })}
            </ul>
          ) : (
            'Series Not Available'
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <h3>Stories</h3>
          {data.stories &&
          data.stories.items &&
          data.stories.items.length > 0 ? (
            <ul>
              {data.stories.items.map(item => {
                return <li key={item.resourceURI}>{item.name}</li>;
              })}
            </ul>
          ) : (
            'Stories Not Available'
          )}
        </div>
        <div className="col-md-6">
          <h3>Events</h3>
          {data.events && data.events.items && data.events.items.length > 0 ? (
            <ul>
              {data.events.items.map(item => {
                return <li key={item.resourceURI}>{item.name}</li>;
              })}
            </ul>
          ) : (
            'Events Not Available'
          )}
        </div>
      </div>
    </div>
  );
}

Content.propTypes = {
  data: PropTypes.object.isRequired,
};
Content.defaultProps = {};
function mapStateToProps(state) {
  return {
    data: state.characterAPI.data,
  };
}
function mapDispatchToProps(dispatch) {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(Content);
