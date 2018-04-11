const Hapi = require('hapi');
const server = new Hapi.Server();

const register_handler = require('./register_handlers');
const login_handler = require('./login_handlers');
const account_handler = require('./account_handlers');
const job_handler = require('./job_handlers');
const review_handler = require('./review_handlers');

server.connection({ port: 5000, host: "0.0.0.0", routes: { cors: true }});

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
  config: {
    cors: {
      origin: ["*"],
      headers: ["Access-Control-Allow-Origin","Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type", "CORELATION_ID"],
      credentials: true
    }},
  method: "OPTIONS",
  path: '/login',
  handler : (request, reply) => {
    reply({ ok : true })
      .header('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE, OPTIONS')
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

//Reviews 

server.route({
  method: "GET",
  path: '/supplier_{supplier_id}/reviews',
  handler: review_handler.retrieveAll
});

server.route({
  method: "PUT",
  path: '/supplier_{supplier_id}/reviews',
  handler: review_handler.publish
});

server.route({
  method: "DELETE",
  path: '/supplier_{supplier_id}/reviews',
  handler: review_handler.remove
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