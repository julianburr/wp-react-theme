import React, { Component } from 'react';
import '../styles/components/header.css';

export default class Header extends Component {
  render () {
    return (
      <div className="header">
        <div className="inner">
          <div className="header__logo">
            <h1><span className="react">React</span> Wordpress</h1>
          </div>
          <div className="header__navigation">
            <div className="header__navigation__menu">
              <ul>
                <li>Something</li>
              </ul>
            </div>
            <div className="header__navigation__search">Search</div>
          </div>
        </div>
      </div>
    );
  }
}
