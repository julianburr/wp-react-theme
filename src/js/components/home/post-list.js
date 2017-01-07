import React, { Component } from 'react';
import HomePostListItem from './post-list-item';

export default class HomePostList extends Component {
  renderLoadingList () {
    return (
      <div className="list">
        <HomePostListItem primary loading />
        <HomePostListItem loading />
      </div>
    );
  }

  render () {
    const { list, loading } = this.props;
    if (loading) {
      return this.renderLoadingList();
    }
    return list.data.posts ? (
      <div className="list">
        {list.data.posts.map((post, i) => {
          if (i === 0) {
            return <HomePostListItem primary post={post} key={i} />
          }
          return <HomePostListItem post={post} key={i} />;
        })}
      </div>
    ) : <p>List not found!</p>;
  } 
}
