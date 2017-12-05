// Package Components/Containers
import React, { Component } from 'react';
// Package Functions
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Images or Styles

// Local Components
// Local Functions
// API Functions (including actions that connect to API)
// Window Functions

class PageHistory extends Component {
  constructor(props) {
    super(props);
    this.page = {
      appName: 'GO-HERO',
      title: 'About',
      desc: 'Assessment from Gojek to Jethro David',
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
        <h2>Tech Stacks</h2>
        <p>React, Redux, Bootstrap, Firebase hosting (for convinience)</p>
        <h2>Features (Based on Assessment)</h2>
        <ol>
          <li>
            Choose minimum one of these open API : <b>Marvel</b>
          </li>
          <li>
            Create a Multipage SPA(Single Page Application) with clear UX
            descriptions and its detail Views : <b>Done</b>
          </li>
          <li>
            Display the API data from point 1 to be an Infinity list :{' '}
            <b>Done</b>
          </li>
          <li>
            Create Sort and/or Filter function to manage the data : <b>Done</b>
          </li>
          <li>
            Create one or more your own custom function to be a feature in your
            webApp :
            <br />
            I'm using panic hero button to request help from Heroes. Saving on
            &nbsp;local <b>Redux State</b> for simulation, i make when
            &nbsp;requestTime(in ms) % 3 === hero'll reject your request. Redux
            &nbsp;state will be <b>cleared</b> on browser's refresh.
          </li>
          <li>
            Feel free to use any frameworks you would like to achieve the task.
            :) : <b>Thank You</b>
          </li>
        </ol>
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
  return { routing: state.routing };
}
export default connect(mapStateToProps)(PageHistory);
