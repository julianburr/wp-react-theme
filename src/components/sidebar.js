import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { renderHtml } from '../utils/render';

class Sidebar extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired
  };

  render () {
    const { settings, id } = this.props;
    if (!settings) {
      return <p>Loading Sidebar...</p>;
    } else if (!settings.sidebars || !settings.sidebars[id]) {
      return <p>Sidebar not found!</p>;
    }
    const elements = renderHtml(settings.sidebars[id].rendered);
    console.log('elements', elements);
    return <div>{elements}</div>;
  }
}

const mapStateToProps = state => {
  return {
    settings: state.settings
  };
}

export default connect(mapStateToProps)(Sidebar);