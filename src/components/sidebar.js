import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Sidebar extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired
  };

  render () {
    const { settings, id } = this.props;
    console.log('settings', settings)
    if (!settings) {
      return <p>Loading Sidebar...</p>;
    } else if (!settings.sidebars || !settings.sidebars[id]) {
      return <p>Sidebar not found!</p>;
    }
    return <div dangerouslySetInnerHTML={{__html: settings.sidebars[id].rendered}} />;
  }
}

const mapStateToProps = state => {
  return {
    settings: state.settings
  };
}

export default connect(mapStateToProps)(Sidebar);