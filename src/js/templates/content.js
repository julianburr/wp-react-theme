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
import ContentPost from './content/post';
import ContentPage from './content/page';

import 'styles/templates/content.scss';

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

  willReceiveProps = (nextProps) => {
    console.log('will receive props', nextProps)
  }

  renderContent () {
    const { content } = this.props;
    console.log('content.isLoading', content.isLoading, content.data.type)
    switch (content.data.type) {
      case 'post':
        return <ContentPost loading={content.isLoading} content={content} />;
      break;

      case 'page':
        return <ContentPage loading={content.isLoading} content={content} />;
      break;

      case 'error':
        // return <ContentError type={content.errorType || 404} content={content} />;
      break;

      default:
        // Loading
        return <ContentPage loading />;
      break;
    }
  }

  render () {
    const { content } = this.props;
    return (
      <div className="content">
        <main className={`content__main`}>
          {this.renderContent()}
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