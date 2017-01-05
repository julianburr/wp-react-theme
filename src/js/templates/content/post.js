import React, { Component } from 'react';
import PostMeta from '../../components/post/meta';
import { renderHtml } from '../../utils/render';

export default class ContentPost extends Component {
  render () {
    const { content } = this.props;
    return (
      <div>
        <PostMeta post={content.data} />
        <h1>{content.data.title}</h1>
        {renderHtml(content.data.content.rendered)}
        {/* TODO: next/prev buttons */}
      </div>
    );
  }
}
