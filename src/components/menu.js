import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Link from './link';

class Menu extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired
  };

  render () {
    const { settings, id } = this.props;
    if (!settings) {
      return <p>Loading menus...</p>;
    } else if (!settings.menus || settings.menus.findIndex(m => m.id === id) < 0) {
      return <p>Sidebar not found!</p>;
    }
    const index = settings.menus.findIndex(m => m.id === id);
    const menu = settings.menus[index];
    return (
      <ul>
        {menu.items.map((item, i) => {
          return <li key={i}><Link href={item.url}>{item.title}</Link></li>
        })}
      </ul>
    );
  }
}

const mapStateToProps = state => {
  return {
    settings: state.settings
  };
}

export default connect(mapStateToProps)(Menu);