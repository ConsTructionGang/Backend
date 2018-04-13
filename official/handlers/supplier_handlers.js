const helpers = require('./handler_helpers');
const que = require('./query');

const query = {
    retrieveSupplier: params => 
        `SELECT 
            Name,
            City,
            Address,
            State,
            Account.Rating, 
            Count(Review.Supplier_ID) Reviews
        FROM Account JOIN Review
        ON Account.ID = Review.Supplier_ID
        WHERE Account.ID = ${params.supplier_id};`
};

function view(request, reply) {
    helpers.runQuery(que.isSupplier(request.params), function(results) {
        if (results.length == 0 || !results[0].isSupplier) {
          return reply({ message: "Page not found" }).code(404);
        } else {
            helpers.runQuery(query.retrieveSupplier(request.params), function(result) {
                return reply({result}).code(200);
            });
        }
    });
}

module.exports = {
    view
};