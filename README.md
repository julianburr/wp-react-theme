# wp-theme-react

This is an experimental Wordpress theme build in JS based on [React](https://facebook.github.io/react/). It uses [`react-router`](https://github.com/ReactTraining/react-router) as well as [Redux](http://redux.js.org/) as controller. On the server side it makes use of the WP Rest API (v2), which gets extended for the necessary information to create a pure JS theme.

This is not meant to be superior over existing server side rendered WP themes, this is simply an experiment.

### What I'll be working on in the first steps
 - [x] ~~create solid build script that creates all necessary files to be simply uploaded to WP as a theme~~ -> created very basic [React boilerplate](https://github.com/julianburr/react-boilerplate)
 - [x] ~~This should support ES6, SASS, ...~~
 - [x] ~~create theme basis, incl. extending WP Rest API for things like menus, widgets, etc~~
 - [x] ~~create solid redux structure for theme~~
 - [x] ~~create logic for routing considering WP settings (-> redirects from settings)~~
 - [x] ~~create react templates and components~~

### Long term goals
 - [ ] Finish APIs
 - [x] ~~`react router` is quiet limited for this purpose (as different rewrite rules easily end up using the same route path structures, since the router doesn't support RegEx) -> build a basic react redux router that supports regular expressions to be able to use the WP rewrite rules for routing pretty much 1 to 1~~ *NOTE: react-router in v4 [supports regular expressions for routes](https://github.com/ReactTraining/react-router/issues/391)!
 - [ ] build solid theme that behaves according to contents and settings in WP
 - [ ] ensure caching where it makes sense to reduce DB connections and API calls
   * also include Webworkers to allow caching contents on the client side (for faster loading times (make sure to consider TTL!) and/or offline availablity)
 - [ ] set up in-build SEO components ([JSON-LD](https://developers.google.com/search/docs/guides/intro-structured-data), sitemaps, etc.)
 - [ ] seperate API extension from theme into its own little plugin, to make the theme independent + make it availabe for others/other react themes
