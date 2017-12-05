// Package Components/Containers
import React from 'react';
// Package Functions
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Images or Styles
import marvelPlaceholder from '../../assetsCustom/img/marv.jpg';
// Local Components
// Local Functions
import { push } from '../../reduxs/routing';
import { getHelp } from '../../reduxs/heroOTW';

function Action({ pushPath, getHeroHelp, data }) {
  const imgPath =
    data.thumbnail &&
    data.thumbnail.path &&
    data.thumbnail.extension &&
    !data.thumbnail.path.includes('image_not_available')
      ? `${data.thumbnail.path}.${data.thumbnail.extension}`
      : marvelPlaceholder;
  return (
    <div className="text-center">
      <button
        onClick={e => {
          e.preventDefault();
          pushPath('/', {}, true);
        }}
        className="btn btn-info m-l-xs m-r-xs"
        type="button"
      >
        BACK
      </button>
      <button
        onClick={e => {
          e.preventDefault();
          getHeroHelp(data.id, data.name, imgPath);
          pushPath('/history', {});
        }}
        className="btn btn-warning m-l-xs m-r-xs"
        type="button"
      >
        HELP ME......!!!
      </button>
    </div>
  );
}

Action.propTypes = {
  pushPath: PropTypes.func.isRequired,
  getHeroHelp: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};
Action.defaultProps = {};
function mapStateToProps(state) {
  return {
    data: state.characterAPI.data,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    pushPath: (pathname, query, preserveOtherQuery) => {
      dispatch(push(pathname, query, preserveOtherQuery));
    },
    getHeroHelp: (charId, charName, charImg) => {
      dispatch(getHelp(charId, charName, charImg));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Action);
