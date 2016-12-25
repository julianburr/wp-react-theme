import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { history } from '../store';

class Link extends Component {
  static propTypes = {
    href: PropTypes.string.isRequired
  };

  handleClick = event => {
    event.preventDefault();
    const { settings, href } = this.props;
    const goTo = href.replace(settings.baseUrl, '');
    console.log('goTo', goTo)
    history.push(goTo);
  }

  render () {
    const { children } = this.props;
    return <a onClick={this.handleClick}>{children}</a>;
  }
}

const mapStateToProps = state => {
  return {
    settings: state.settings
  };
}

export default connect(mapStateToProps)(Link);