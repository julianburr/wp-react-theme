import React, { Component } from 'react';
import { renderHtml } from '../../utils/render';

export default class ContentPage extends Component {
  render () {
    const { content, loading } = this.props;
    console.log('loading', loading)
    return loading ? (
      <div className='content__text--page loading content__text--loading'>
        <h1>---------------</h1>
        <p>------------------------------------------------------------------------------------------------------</p>
        <p>-------------------------------------------------------------------------------------------------------------------------------------</p>
      </div>
    ) : (
      <div className='content__text--page'>
        <h1>{content.data.data.title}</h1>
        {renderHtml(content.data.data.content.rendered)}
      </div>
    );
  }
}
