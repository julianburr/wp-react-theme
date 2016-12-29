import React, { Component } from 'react';
import Link from '../link';
import { renderHtml } from '../../utils/render';
import PostMeta from '../post/meta';

export default class HomePostListItem extends Component {
  render () {
    const { post } = this.props;
    return (
      <div className="list__item">
        <div className="list__item__image">
          <img src="https://placehold.it/200x150" />
        </div>
        <div className="list__item__post">
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
