import React, { Component } from 'react';
import Link from '../link';
import moment from 'moment';

import 'styles/components/post/meta.scss';

export default class PostMeta extends Component {
  render () {
    const { post } = this.props;
    const date = moment(post.date).format('Do MMMM YYYY');
    return (
      <div className="post__meta">
        <span className="post__meta__date">{date}</span>
        <span className="post__meta__categories">
          <ul>{post.categories ? post.categories.map((cat, i) => {
            if (cat !== 1) {
              if (cat.id) {
                return <li key={i}><Link href={cat.link}>{cat.name}</Link></li>;
              }
              return <li key={i}>Category {cat}</li>;
            }
          }) : null}</ul>
        </span>
        <span className="post__meta__tags">
          <ul>{post.tags ? post.tags.map((tag, i) => {
            if (tag.id) {
              return <li key={i}><Link href={tag.link}>{tag.name}</Link></li>;
            }
            return <li key={i}>Tag {tag}</li>;
          }) : null}</ul>
        </span>
      </div>
    );
  }
}
