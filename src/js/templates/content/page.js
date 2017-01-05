import React, { Component } from 'react';
import { renderHtml } from '../../utils/render';

export default class ContentPage extends Component {
  render () {
    const { content } = this.props;
    return (
      <div>
        <h1>{content.data.title}</h1>
        {renderHtml(content.data.content.rendered)}
      </div>
    );
  }
}
