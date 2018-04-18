const Hapi = require('hapi');
const server = new Hapi.Server();

const account_handler = require('./account/handlers');
const job_handler = require('./job/handlers');
const review_handler = require('./reviews/handlers');
const supply_handler = require('./supply/handlers');
const supplier_handler = require('./suppliers/handlers');

server.connection({ port: 5000, host: "0.0.0.0", 
	routes: {
		cors: {
			origin: ["*"],
			headers: ["Access-Control-Allow-Origin","Access-Control-Allow-Headers","Content-Type"],
			credentials: true
			// additionalHeaders: ["Access-Control-Allow-Origin","Access-Control-Allow-Headers",
			// "Content-Type", "Accept-Language"],
			// additionalExposedHeaders: ["Access-Control-Allow-Origin","Access-Control-Allow-Headers",
			// "Content-Type", "Origin", "Accept-Language"]
		}
	}
});

server.route({
	method: "GET",
	path: "/user",
	handler: function(request, reply) {
		console.log("Server processing a / request");
		return reply("Hello, worlds");
	}
});

// Signup

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
	handler: account_handler.register
});

// Login

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
	handler: account_handler.login
});

server.route({
	method: 'PUT',
	path: '/login',
	handler: account_handler.login
});

// Change Password

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
	handler: account_handler.changePassword
});

// Delete Account

server.route({
	method: "DELETE",
	path: '/deleteuser',
	handler: function (reply, err){
		if(err) throw err;
		return reply('Account Successfully created').code(200);
	}
});

// Suppliers + Reviews

server.route({
	method: "GET",
	path: "/suppliers",
	handler: supplier_handler.viewAll
});

server.route({
	method: "GET",
	path: "/supplier={supplier_id}",
	handler: supplier_handler.view
});

server.route({
	method: "GET",
	path: '/supplier={supplier_id}/reviews',
	handler: review_handler.retrieveAll
});

server.route({
	method: "PUT",
	path: '/supplier={supplier_id}/reviews',
	handler: review_handler.publish
});

server.route({
	method: "DELETE",
	path: '/supplier={supplier_id}/reviews',
	handler: review_handler.remove
});

server.route({
	method: "POST",
	path: '/addsupplies',
	handler: supply_handler.addSupply
});

//Reviews - Dispute

server.route({
	method: "PUT",
	path: '/supplier={supplier_id}/dispute',
	handler: function() {
		console.log('do something');
	}
});

server.route({
	method: "GET",
	path: '/view/supplies',
	handler: supply_handler.viewSupplies
});

server.route({
	method: "GET",
	path: '/view/supplies/{tag}/m=1',
	handler: supply_handler.viewSuppliesTaggedMultiple
});

server.route({
	method: "GET",
	path: '/view/supplies/{tag}',
	handler: supply_handler.viewSuppliesTagged
});

server.route({
	method: "GET",
	path: '/view/supplies/s=0{tag}',
	handler: supply_handler.viewSuppliesSortedASC
});

server.route({
	method: "GET",
	path: '/view/supplies/s=1{tag}',
	handler: supply_handler.viewSuppliesSortedDSC
});

server.route({
	method: "POST",
	path: '/createjob',
	handler: job_handler.createJob
});


server.route({
	method: "PUT",
	path: '/job/todolist',
	handler: job_handler.addTask
});

server.route({
	method: "POST",
	path: '/addtolist',
	handler: job_handler.addSupplyToJob
});

server.start(err => {
	if (err) {
		throw err;
	}
	console.log(`Server running at: ${server.info.uri}`);
});