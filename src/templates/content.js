import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Seo from '../components/seo';
import Sidebar from '../components/sidebar';
import Menu from '../components/menu';
import axios from 'axios';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { loadContent } from '../actions/content';

class Content extends Component {
  constructor (props) {
    super();
    console.log('constructor', props);
    if (props.loadContent) {
      props.loadContent(Content.getSlug(props));
    }
  }

  static getSlug = (props) => {
    const { postname, splat } = props.params;
    return postname || splat;
  }

  render () {
    const { content } = this.props;
    return (
      <div className="App">
        <Seo {...this.props} />
        <h1>Trying to get main content</h1>
        <p>For slug <b>{Content.getSlug(this.props)}</b></p>
        <Sidebar id='home' />
        <h2>Menu</h2>
        <Menu id={2} />
        {content ? <pre>{JSON.stringify(content, null, 4)}</pre> : <p>Loading content...</p>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    content: state.content
  };
}

const mapDispatchToProps = dispatch => {
  return {
    loadContent: slug => dispatch(loadContent(slug))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);