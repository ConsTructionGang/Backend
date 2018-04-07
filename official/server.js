const Hapi = require('hapi');
const server = new Hapi.Server();
const database = require('./database');

const register_handler = require('./register_handlers');
const login_handler = require('./login_handlers');
const account_handler = require('./account_handlers');
const job_handler = require('./job_handlers');
const supply_handler = require('./supply_handlers')

server.connection({ port: 5000, host: "0.0.0.0" });

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
<<<<<<< HEAD
  handler: function (reply, err){
    if(err) throw err;
    return reply('Job Successfully created').code(200);
  }
=======
  handler: job_handler.createJob
>>>>>>> f94cf1122c688c7f9ab05acae8693e70414b81d3
});

server.route({
<<<<<<< HEAD
  method: "DELETE",
  path: '/deleteuser',
  handler: function (reply, err){
    if(err) throw err;
    return reply('Account Successfully created').code(200);
  }
=======
  method: "POST",
  path: '/addsupplies',
  handler: supply_handler.addSupply
>>>>>>> f94cf1122c688c7f9ab05acae8693e70414b81d3
});

server.start(err => {
  if (err) {
    throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
});
