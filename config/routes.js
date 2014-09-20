// Draw routes.  Locomotive's router provides expressive syntax for drawing
// routes, including support for resourceful routes, namespaces, and nesting.
// MVC routes can be mapped to controllers using convenient
// `controller#action` shorthand.  Standard middleware in the form of
// `function(req, res, next)` is also fully supported.  Consult the Locomotive
// Guide on [routing](http://locomotivejs.org/guide/routing.html) for additional
// information.
module.exports = function routes() {
  this.root('pages#main');
  this.match('process', 'pages#process');
  this.match('api/v1/projects', "pages#create", {via:["POST"]});
  this.match('api/v1/projects', "pages#list", {via:["GET"]});
  this.match('api/v1/projects/:id', "pages#delete", {via:["DELETE"]});
  this.match('api/v1/projects/:id', "pages#runTest", {via:["GET"]});
}
