import React, { Component } from 'react';
import Helmet from 'react-helmet';
import axios from 'axios';
import { browserHistory } from 'react-router';
import Seo from '../components/seo';
import { loadList } from '../actions/list';
import { connect } from 'react-redux';
import Sidebar from '../components/sidebar';
import Menu from '../components/menu';
import { renderHtml } from '../utils/render';

class Home extends Component {
  componentDidMount () {
    console.log('check', this.props)
    if (this.props.loadList) {
      this.props.loadList();
    }
  }

  render () {
    const { settings, list } = this.props;
    return (
      <div className="App">
        <Seo {...this.props} />
        <h1>Homepage</h1>
        <p>{['This', 'is a test'].map(c => c)}</p>
        <Sidebar id='home' />
        <h2>Menu</h2>
        <Menu id={2} />
        <h2>Posts</h2>
        <div>
          {list ? list.map((post, i) => {
            return (
              <div key={i}>
                <h3>{post.title.rendered}</h3>
                {renderHtml(post.content.rendered)}
              </div>
            );
          }) : <p>I'm loading the list, be patient...</p>}
        </div>
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