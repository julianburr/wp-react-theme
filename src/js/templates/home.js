import React, { Component } from 'react';
import Helmet from 'react-helmet';
import axios from 'axios';
import { browserHistory } from 'react-router';
import Seo from '../components/seo';
import { loadList } from '../actions/list';
import { connect } from 'react-redux';
import { renderHtml } from '../utils/render';
import Link from '../components/link';
import HomePostList from '../components/home/post-list';

import 'styles/templates/home.scss';

class Home extends Component {
  constructor (props) {
    super(props);
    if (props.loadList) {
      props.loadList();
    }
  }

  render () {
    const { settings, list } = this.props;
    return (
      <div className="home">
        {list ? <HomePostList list={list} /> : <p>I'm loading the list, be patient...</p>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    settings: state.settings,
    list: state.list
  };
}

const mapDispatchToProps = dispatch => {
  return {
    loadList: (args) => dispatch(loadList(args))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);