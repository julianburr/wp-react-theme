import React, { Component } from 'react';
import HomePostListItem from './post-list-item';
import HomePostListItemPrimary from './post-list-item-primary';


export default class HomePostList extends Component {
  render () {
    const { list } = this.props;
    return (
      <div className="list">
        {list.map((post, i) => {
          if (i === 0) {
            return <HomePostListItemPrimary post={post} key={i} />
          }
          return <HomePostListItem post={post} key={i} />;
        })}
      </div>
    );
  } 
}
