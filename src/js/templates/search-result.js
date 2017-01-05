import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Seo from '../components/seo';
import axios from 'axios';
import { browserHistory } from 'react-router';

export default class SearchResult extends Component {
  render () {
    console.log('this.props.params', this.props.params)
    return (
      <div className="App">
        <Seo {...this.props} />
        <h1>Search results</h1>
        <pre>{JSON.stringify(this.props, null, 4)}</pre>
      </div>
    );
  }
}
