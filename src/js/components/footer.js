import React, { Component } from 'react';
import Link from './link';
import moment from 'moment';
import 'styles/components/footer.scss';

export default class Header extends Component {
  render () {
    return (
      <div className="footer">
        <div className="inner">
          <p>&copy; React Wordpress Theme {moment().format('YYYY')} - <Link href="https://github.com/julianburr/wp-react-theme">See on github</Link></p>
        </div>
      </div>
    );
  }
}



