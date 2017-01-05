import React, { Component } from 'react';
import Link from './link';
import Menu from './menu';
import Search from './search';
import 'styles/components/header.scss';

export default class Header extends Component {
  render () {
    return (
      <div className="header">
        <div className="inner">
          <div className="header__logo">
            <Link href='/'>
              <h1><span className="react">React</span> Wordpress</h1>
            </Link>
          </div>
          <div className="header__navigation">
            <div className="header__navigation__menu">
              <Menu id={2} />
            </div>
            <div className="header__navigation__search">
              <Search />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
