import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Index from './templates';
import Loading from './templates/loading';
import Home from './templates/home';
import SearchResult from './templates/search-result';
import Content from './templates/content';

import { connect } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import { history } from './store';
import { loadSettings } from './actions/settings';

class WPThemeRoutes extends Component {
  componentDidMount () {
    if (this.props.loadSettings) {
      this.props.loadSettings();
    }
  }

  getRoutes () {
    const { settings } = this.props;
    // Home route
    let routes = []; // [{path: '/', component: Home, name: 'home'}];
    settings.routes.lists.forEach((route, i) => {
      // Loop through routes from API
      // These are generated using the WP rewrite rules!
      routes.push({path: route, component: SearchResult});
    })
    routes.push({path: settings.routes.content, component: Content, name: 'post'});
    // Finally add the content rule for everything else
    routes.push({path: '*', component: Content, name: 'fallback'});
    return routes;
  }

  willReceiveProps = (nextProps) => {
    console.log('ROUTES will receive props', nextProps)
  }

  render () {
    const { settings } = this.props;
    console.log('ROUTES render')
    // Show loading screen while we wait for the settings
    // After settings have been loaded, return the routes
    return settings ? (
      <Router history={history}>
        <Route path='/' component={Index}>
          <IndexRoute component={Home} />
          {this.getRoutes().map((route, i) => (
            <Route key={i} path={route.path} component={route.component} />
          ))}
        </Route>
      </Router>
    ) : <Loading />;
  }
}

/**
 * Connect component to redux store
 */
const mapStateToProps = state => {
  return {
    settings: state.settings
  };
}

const mapDispatchToProps = dispatch => {
  return {
    loadSettings: () => dispatch(loadSettings())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WPThemeRoutes)
