import React, { Component } from 'react';
import Helmet from 'react-helmet';

export default class Seo extends Component {
  render () {
    return (
      <Helmet
        title="What the fuck, this is great"
        script={[{
          "type": "application/ld+json",
          "innerHTML": `{
            "@context": "http://schema.org",
            "@type": "Organization",
            "url": "http://dev.burrdesign.de",
            "contactPoint": [{
              "@type": "ContactPoint",
              "telephone": "+1-401-555-1212",
              "contactType": "${this.props.params ? this.props.params.splat : 'customer service'}"
            }]
          }`
        }]}
      />
    );
  }
}