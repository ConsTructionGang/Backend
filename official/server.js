const Hapi = require('hapi');
const server = new Hapi.Server();

const register_handler = require('./register_handlers');
const login_handler = require('./login_handlers');
const account_handler = require('./account_handlers');
const job_handler = require('./job_handlers');
const review_handler = require('./review_handlers');

server.connection({routes: {cors: true}, port: 5000, host: "0.0.0.0" });

server.route({
  method: "GET",
  path: "/user",
  handler: function(request, reply, err) {
    console.log("Server processing a / request");
    return reply("Hello, worlds");
  }
});

server.route({
  method: "GET",
  path: "/signup",
  handler: function(request, reply, err) {
    if (err) throw err;
    return reply("Signup page").code(200);
  }
});

server.route({
  method: "POST",
  path: "/signup",
  handler: register_handler
});

server.route({
  method: "GET",
  path: '/login',
  handler: function(request, reply, err) {
    if(err) throw err;
    return reply("Login page").code(200);
  }
});

server.route({
  method: "POST",
  path: '/login',
  handler: login_handler
});

server.route({
  method: "GET",
  path: '/changepassword',
  handler: function(request, reply, err) {
    if(err) throw err;
    return reply("Change Password Page").code(200);
  }
});

server.route({
  method: "POST",
  path: '/changepassword',
  handler: account_handler
});

server.route({
  method: "POST",
  path: '/createjob',
  handler: job_handler.createJob
});

//Reviews 

server.route({
  method: "GET",
  path: '/supplier_{supplier_id}/reviews',
  handler: review_handler.retrieveAll
});

server.route({
  method: "DELETE",
  path: '/supplier_{supplier_id}/reviews',
  handler: review_handler.remove
});

server.route({
  method: "PUT",
  path: '/supplier_{supplier_id}/reviews',
  handler: review_handler.publish
});


server.start(err => {
  if (err) {
    throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
});