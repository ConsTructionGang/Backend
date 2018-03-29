const Hapi = require('hapi');
const server = new Hapi.Server();
const database = require('./database');

const register_handler = require('./register_handlers');
const login_handler = require('./login_handlers');

server.connection({ port: 5000, host: "0.0.0.0" });

server.route({
  method: "GET",
  path: "/",
  handler: function(request, reply) {
    console.log("Server processing a / request");
    reply("Hello, worlds");
  }
});

server.route({
  method: "POST",
  path: '/signup',
  handler: register_handler
});

// server.route({
//   method: "POST",
//   path: '/login',
//   handler: login_handler
// });

server.start(err => {
  if (err) {
    throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
});
