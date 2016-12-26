import React from 'react';
import Link from '../components/link';

export const renderNode = (node, level = 0) => {
  // Render HTML node object recursively
  let output = [];
  for (let i=0; i<node.childNodes.length; i++) {
    const key = `${level}-${i}`;
    const child = node.childNodes[i];
    if (!child.tagName) {
      output.push(child.nodeValue);
    } else if (child.tagName.toLowerCase() === 'a') {
      // Use custom link component to be able to use routing for internal links!
      output.push(<Link key={key} href={child.getAttribute('href')}>{renderNode(child, level+1)}</Link>);
    } else {
      const Tag = child.tagName.toLowerCase();
      output.push(<Tag key={key}>{renderNode(child, level+1)}</Tag>);
    }
  }
  console.log('output', output)
  return output;
}

export const renderHtml = (html) => {
  // Render html from string
  // Creates html node object from string and renders that
  let div = document.createElement('div');
  div.innerHTML = html;
  return renderNode(div);
}