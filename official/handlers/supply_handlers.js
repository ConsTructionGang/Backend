const database = require('./database');
const query = require('./query');
const helpers  = require('./handler_helpers');

function addSupply(request, reply) {
      console.log("add supply target hit");
};

module.exports = {
      addSupply,
}