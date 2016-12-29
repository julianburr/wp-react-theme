import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Seo from '../components/seo';
import Sidebar from '../components/sidebar';
import Menu from '../components/menu';
import PostMeta from '../components/post/meta';
import axios from 'axios';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { loadContent } from '../actions/content';
import { renderHtml } from '../utils/render';

import '../styles/templates/content.css';

class Content extends Component {
  constructor (props) {
    super();
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
      <div className="content">
        <main className={`content__main content__main--${content ? content.type || 'default' : 'loading'}`}>
          {content ? (
            <div>
              <PostMeta post={content.data} />
              <h1>{content.data.title}</h1>
              {renderHtml(content.data.content.rendered)}
              <pre>{JSON.stringify(content, null, 4)}</pre>
            </div>
          ) : <p>Loading content...</p>}
        </main>
        <aside className='content__sidebar'>
          <Sidebar id='home' />
        </aside>
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