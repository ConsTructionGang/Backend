const query = {
	retrieve: params =>
		`SELECT
			Name,
			Address,
			City,
			State,
			(
				SELECT AVG(Rating)
				FROM Review
				WHERE Supplier_ID = ${params.supplier_id}
			) Rating,
			Count(Review.Supplier_ID) Reviews
		FROM Account JOIN Review
		ON Account.ID = Review.Supplier_ID
		WHERE Account.ID = ${params.supplier_id};`,
	retrieveAll: () =>
		`SELECT
			ID,
			Name,
			Rating
		FROM Account
		WHERE isSupplier = true;`,
	isSupplier: params =>
		`SELECT isSupplier
		FROM Account
		WHERE ID = '${params.supplier_id}';`
};


module.exports = query;