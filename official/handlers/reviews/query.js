const query = {
	post: request =>
		`INSERT INTO Review(
			Author_ID,
			Supplier_ID, 
			Date_Created,
			Title,
			Body,
			Rating
		) VALUES (
			${request.payload.author_id},
			${request.params.id},
			CURDATE(),
			"${request.payload.title}",
			"${request.payload.body}",
			${request.payload.rating}
		);`,
	retrieve: payload =>
		`SELECT
			t.Review_ID, 
			t.Author_ID,
			t.Name, 
			t.Date_Created,
			t.Title, 
			t.Body, 
			t.Rating, 
			Comment.Body Comment,
			Comment.Date_Created Date
		FROM (
			SELECT Review_ID, Author_ID, Name, Date_Created, Title, Body, Review.Rating
			FROM Review JOIN Account ON Account.ID = Review.Author_ID
			WHERE Supplier_ID = '${payload.id}'
		) t LEFT JOIN Comment 
		ON t.Review_ID = Comment.Review_ID
		Order By t.Date_Created;`,
	remove: (payload, params) =>
		`DELETE FROM Review
		WHERE Supplier_ID = '${params.supplier_id}'
		AND Author_ID = '${payload.author_id}';`,
	authorIsSupplier: payload =>
		`SELECT isSupplier
		FROM Account
		WHERE ID = '${payload.author_id}';`,
	alreadyReviewed: (payload, params) =>
		`SELECT *
		FROM Review
		WHERE Supplier_ID = '${params.supplier_id}'
		AND Author_ID = '${payload.author_id}';`
};

module.exports = query;
