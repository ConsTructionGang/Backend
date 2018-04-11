const database = require('./database');
const helpers = require('./handler_helpers');

const query = {
    postReview: request =>
        `INSERT INTO Review(
            Author_ID,
            Supplier_ID, 
            Date_Created,
            Title,
            Body,
            Rating
        ) VALUES (
            '${request.payload.author_id}',
            '${request.params.supplier_id}',
            '${request.payload.date}',
            '${request.payload.title}',
            '${request.payload.body}',
            '${request.payload.rating}'
        );`,
    retrieveReviews: payload =>
        `SELECT * 
        FROM Review
        WHERE Supplier_ID = '${payload.supplier_id}';`,
    deleteReview: (payload, params) =>
        `DELETE FROM Review
        WHERE Supplier_ID = '${params.supplier_id}'
        AND Author_ID = '${payload.author_id}';`,
    updateAvgScore: payload =>
        `UPDATE Account
        SET Rating = (
            SELECT AVG(Rating)
            FROM Review
            WHERE Supplier_ID = '${payload.supplier_id}'
        )
        WHERE ID = '${payload.supplier_id}';`,
    isSupplier: payload =>
        `SELECT isSupplier
        FROM Account
        WHERE ID = '${payload.author_id}';`
};

function publish(request, reply){
    helpers.runQuery(query.isSupplier(request.payload), function(results) {
        if(results[0].isSupplier) {
            return reply({
                message: "Cannot review another supplier"
            }).code(400);
        } else {
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
    });
}

function retrieveAll(request, reply) {
    helpers.runQuery(query.retrieveReviews(request.params), function(results) {
        return reply({
            results
        }).code(200);
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
    helpers.runQuery(query.updateAvgScore(request.params), callback());
}

module.exports = {
    publish,
    remove,
    retrieveAll
};



