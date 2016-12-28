# wp-theme-react

This is an experimental Wordpress theme build in JS based on [React](https://facebook.github.io/react/). It uses [`react-router`](https://github.com/ReactTraining/react-router) as well as [Redux](http://redux.js.org/) as controller. On the server side it makes use of the WP Rest API (v2), which gets extended for the necessary information to create a pure JS theme.

This is not meant to be superior over existing server side rendered WP themes, this is simply an experiment.

### What I'll be working on in the first steps
 * create solid build script that creates all necessary files to be simply uploaded to WP as a theme
 * create theme basis, incl. extending WP Rest API for things like menus, widgets, etc
 * create solid redux structure for theme
 * create solid logic for routing considering WP settings (-> redirects from settings)
 * create react templates and components

### Long term goals
 * build a basic react redux router that supports regex to be able to use the WP rewrite rules for routing
 * build solid theme that behaves according to contents and settings in WP
 * ensure caching where it makes sense to reduce DB connections and API calls
 * set up in-build SEO components ([JSON-LD](https://developers.google.com/search/docs/guides/intro-structured-data), sitemaps, etc.)
 * seperate API extension from theme into its own little plugin, to make the theme independent + make it availabe for others/other react themes
