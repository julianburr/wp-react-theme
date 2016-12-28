import React, { Component } from 'react';
import Link from '../link';
import moment from 'moment';

export default class PostMeta extends Component {
  render () {
    const { post } = this.props;
    const date = moment(post.date).format('Do MMMM YYYY');
    return (
      <div className="list__item__meta">
        <span className="list__item__meta__date">{date}</span>
        <span className="list__item__meta__categories">
          <ul>{post.categories ? post.categories.map((cat, i) => {
            return <li key={i}>Category {cat}</li>;
          }) : null}</ul>
        </span>
        <span className="list__item__meta__tags">
          <ul>{post.tags ? post.tags.map((cat, i) => {
            return <li key={i}>Tag {cat}</li>;
          }) : null}</ul>
        </span>
      </div>
    );
  }
}
