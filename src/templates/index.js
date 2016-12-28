import React, { Component } from 'react';
import Header from '../components/header';
import '../styles/index.css';

export default class Index extends Component {
  render () {
    return (
      <div className="wrap-all">
        <Header />
        <div className="content">
          <div className="inner">
            {this.props.children}
          </div>
        </div>
        <div className="footer">
          <div className="inner">
            Footer
          </div>
        </div>
      </div>
    );
  }
}