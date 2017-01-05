import React, { Component } from 'react';
import Link from '../link';
import { renderHtml } from '../../utils/render';
import PostMeta from '../post/meta';

export default class HomePostListItemPrimary extends Component {
  render () {
    const { post } = this.props;
    return (
      <div className="list__item list__item--primary">
        <div className="list__item--primary__image">
          <img src='https://placehold.it/400x300' />
        </div>
        <div className="list__item--primary__post">
          <Link href={post.link}>
            <h3>{post.title.rendered}</h3>
          </Link>
          <PostMeta post={post} />
          <div className="list__item__excerpt">
            {renderHtml(post.excerpt.rendered)}
          </div>
        </div>
      </div>
    );
  }
}
