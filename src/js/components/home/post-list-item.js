import React, { Component } from 'react';
import Link from '../link';
import { renderHtml } from '../../utils/render';
import PostMeta from '../post/meta';

export default class HomePostListItem extends Component {
  getWrapperClassList = () => {
    const { loading, primary } = this.props;
    let classList = 'list__item';
    classList += loading ? ' list__item--loading loading' : '';
    classList += primary ? ' list__item--primary' : '';
    return classList;
  }

  render () {
    const { post, loading } = this.props;
    return (
      <div className={this.getWrapperClassList()}>
        <div 
          className="list__item__image" 
          style={{backgroundImage: loading ? null : 'url(https://placehold.it/400x300)'}}
        />
        {loading ? (
          <div className="list__item__post">
            <h3>----------------</h3>
            <div className="list__item__excerpt">
              <p>----------------------------------------------------------------------------------------------------------------------------</p>
            </div>
          </div>
        ) : (
          <div className="list__item__post">
            <Link href={post.link}>
              <h3>{post.title.rendered}</h3>
            </Link>
            <PostMeta post={post} />
            <div className="list__item__excerpt">
              {renderHtml(post.excerpt.rendered)}
            </div>
          </div>
        )}
      </div>
    );
  }
}
