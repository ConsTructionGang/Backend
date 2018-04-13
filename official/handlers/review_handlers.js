const helpers = require('./handler_helpers');
const query = require('./review_query');

function publish(request, reply){
    helpers.runQuery(query.isSupplier(request.params), function(results) {
        if(!results[0].isSupplier) {
            return reply({
                message: "Only permitted to review suppliers"
            }).code(400);
        } else {
            helpers.runQuery(query.authorIsSupplier(request.payload), function(results) {
                if(results[0].isSupplier) {
                    return reply({
                        message: "Cannot review another supplier"
                    }).code(400);
                } else {
                    helpers.runQuery(query.alreadyReviewed(request.payload, request.params), function(result, err) {
                        if (result.length) {
                            return reply({
                                message: "Cannot re-review a company"
                            }).code(400);
                        } else {
                            insertReview(request, reply);
                        }
                    });
                }
            });
        }
    });
}

function insertReview(request, reply) {
    helpers.runQuery(query.postReview(request), function(results, err) {
        if (err) {
            return reply({
                message: "Problem publishing review"
            }).code(400);
        } else {
            updateAvgRating(request, function(result) {
                return reply({
                    message: "Review has been published"
                }).code(200);
            });
        }
    });
}

function retrieveAll(request, reply) {
    helpers.runQuery(query.isSupplier(request.params), function(results) {
        if(results.length == 0 || !results[0].isSupplier){
            return reply({
                message: "Page not found"
            }).code(404);
        } else {
            helpers.runQuery(query.retrieveReviews(request.params), function(results) {
                return reply({
                    results
                }).code(200);
            });
        }
    });
}

function remove(request, reply) {
    helpers.runQuery(query.deleteReview(request.payload, request.params), function(results, err) {
        if (err) {
            return reply({
                message: "Error occured when deleting review"
            }).code(400);
        } else {
            updateAvgRating(request, function(result) {
                return reply({
                    message: "Review has been deleted"
                }).code(200);
            });
        }
    });
}

function updateAvgRating(request, callback) {
    console.log(`Rating edited for ${request.params.supplier_id}`);
    helpers.runQuery(query.updateAvgScore(request.params), callback);
}

module.exports = {
    publish,
    remove,
    retrieveAll
};



