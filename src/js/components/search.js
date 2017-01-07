import React, { Component } from 'react';
import 'styles/components/search.scss';

export default class Search extends Component {
  constructor () {
    super();
    this.state = {
      isActive: false
    };
    this._refs = {};
  }

  toggleSearch = () => {
    this._refs.input.focus();
    this.setState({ isActive: !this.state.isActive });
  }

  handleSearch = (event) => {
    console.log('event', event.nativeEvent)
    if (event.nativeEvent.charCode === 13) {
      alert('Search...');
    }
  }

  render () {
    const { isActive } = this.state;
    return (
      <div className='search'>
        <div className={`search__field ${isActive ? 'search__field--active' : ''}`}>
          <input type="text" placeholder="Search for the unthinkable..." ref={c => this._refs.input = c} onKeyPress={this.handleSearch} />
        </div>
        <button onClick={this.toggleSearch} className="search__button">
          {isActive ? <span>&times;</span> : <span className='icon icon-search' />}
        </button>
      </div>
    );
  }
}
