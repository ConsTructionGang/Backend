const Hapi = require('hapi');
const server = new Hapi.Server();
const database = require('./database');

const register_handler = require('./register_handlers');
const login_handler = require('./login_handlers');
const account_handler = require('./account_handlers');
const job_handler = require('./job_handlers');
const supply_handler = require('./supply_handlers')

server.connection({ port: 5000, host: "0.0.0.0", routes: { cors: true}});

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
  method: "OPTIONS",
  path: '/login',
  handler : (request, reply) => {
    reply({ ok : true })
        .header('Access-Control-Allow-Methods', 'PUT')
}
});

server.route({
  method: "POST",
  path: '/login',
  handler: login_handler
});

server.route({
  method: 'PUT',
  path: '/login',
  handler: login_handler
})

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

server.route({
  method: "DELETE",
  path: '/deleteuser',
  handler: function (reply, err){
    if(err) throw err;
    return reply('Account Successfully created').code(200);
  }
});

server.route({
  method: "POST",
  path: '/addsupplies',
  handler: supply_handler.addSupply
})

server.start(err => {
  if (err) {
    throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
});
