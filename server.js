var locomotive = require('locomotive')
  , bootable = require('bootable');

// Create a new application and initialize it with *required* support for
// controllers and views.  Move (or remove) these lines at your own peril.
var app = new locomotive.Application();
app.phase(locomotive.boot.controllers(__dirname + '/app/controllers'));
app.phase(locomotive.boot.views());

// Add phases to configure environments, run initializers, draw routes, and
// start an HTTP server.  Additional phases can be inserted as needed, which
// is particularly useful if your application handles upgrades from HTTP to
// other protocols such as WebSocket.
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

app.phase(require('bootable-environment')(__dirname + '/config/environments'));
app.phase(bootable.initializers(__dirname + '/config/initializers'));
app.phase(locomotive.boot.routes(__dirname + '/config/routes'));
app.phase(locomotive.boot.httpServer(server_port, server_ip_address));

// Boot the application.  The phases registered above will be executed
// sequentially, resulting in a fully initialized server that is listening
// for requests.
app.boot(function(err) {
  if (err) {
    console.error(err.message);
    console.error(err.stack);
    return process.exit(-1);
  }
});
