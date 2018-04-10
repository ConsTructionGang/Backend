const database = require('./database');
const helpers = require('./handler_helpers');

const query = {
    postReview: payload =>
        `INSERT INTO Review(
            Author,
            Supplier_ID, 
            Title,
            Body,
            Rating
        ) VALUES (
            '${payload.author}',
            '${payload.supplier_id}',
            '${payload.title}',
            '${payload.body}',
            '${payload.rating}'
        );`,
    retrieveReviews: payload =>
        `SELECT * 
        FROM Review
        WHERE Supplier_ID = '${payload.supplier_id}';`,
    deleteReview: payload =>
        `DELETE FROM Review
        WHERE Supplier_ID = '${payload.supplier_id}'
        AND Author = '${payload.author}';`,
    updateAvgScore: payload =>
        `UPDATE Account
        SET Rating = (
            SELECT AVG(Rating)
            FROM Review
            WHERE Supplier_ID = '${payload.supplier_id}'
        ) t
        WHERE ID = '${payload.supplier_id}';`
};

function publish(request, reply){
    runQuery(query.postReview, request.payload, function(results) {
        return reply("Review published").code(200);
    });
    updateAvgRating(request);
}

function edit() {

}

function retrieveAll(request, reply) {
    runQuery(query.retrieveReviews, request.params, function(results) {
        return reply(results).code(200);
    });
}

function remove() {
    
}

function updateAvgRating(request) {
    runQuery(query.updateAvgScore, request.params, function(results) {
        console.log(`Updating review rating for ${request.params.supplier_id}`);
    });
}

module.exports = {
    publish,
    remove,
    retrieveAll
};



