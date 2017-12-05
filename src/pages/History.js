// Package Components/Containers
import React, { Component } from 'react';
// Package Functions
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Images or Styles

// Local Components
import List from '../components/history/List';
// Local Functions
// API Functions (including actions that connect to API)
// Window Functions

class PageHistory extends Component {
  constructor(props) {
    super(props);
    this.page = {
      appName: 'GO-HERO',
      title: 'History',
      desc: 'History of Called Hero',
    };
  }
  componentWillMount() {
    document.title = `${this.page.title} | ${this.page.appName}`;
    const metaList = document.head.getElementsByTagName('meta');
    metaList[5].content = this.page.desc;
  }
  render() {
    return (
      <div className="page-wrapper">
        <div className="text-center">
          <h3 className="page-header m-none">{this.page.title}</h3>
          {this.page.desc}
        </div>
        <List />
      </div>
    );
  }
}

PageHistory.propTypes = {
  // children: PropTypes.any,
};
PageHistory.defaultProps = {
  // children: null,
};
function mapStateToProps(state) {
  return {};
}
export default connect(mapStateToProps)(PageHistory);
