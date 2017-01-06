import React, { Component } from 'react';
import PostMeta from '../../components/post/meta';
import { renderHtml } from '../../utils/render';

export default class ContentPost extends Component {
  render () {
    const { content } = this.props;
    console.log('content.data.data', content.data.data)
    return (
      <div>
        <PostMeta post={content.data.data} />
        <h1>{content.data.data.title}</h1>
        {renderHtml(content.data.data.content.rendered)}
        {/* TODO: next/prev buttons */}
      </div>
    );
  }
}
