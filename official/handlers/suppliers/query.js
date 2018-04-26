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
            Avg Rating
		FROM Account JOIN (
				SELECT Supplier_ID, Avg(Rating) Avg
				FROM Review
				GROUP BY Supplier_ID
			) Rating ON Account.ID = Rating.Supplier_ID
		WHERE isSupplier = true;`,
	isSupplier: params =>
		`SELECT isSupplier
		FROM Account
		WHERE ID = '${params.supplier_id}';`,
	retrieveAllByName: params =>
		`SELECT Supply_ID, Supplier_ID, Price, i.Name, Email, Address, City, State
		FROM Supplies s  NATURAL JOIN Item i INNER JOIN Account a
		ON s.Supplier_ID = a.ID
		Where i.Name LIKE '%${params.supply}%';`,
	retrieveAllByID: params =>
		`SELECT Supply_ID, Supplier_ID, Price, i.Name, Email, Address, City, State
		FROM Supplies s  NATURAL JOIN Item i INNER JOIN Account a
		ON s.Supplier_ID = a.ID
		WHERE s.Supply_ID = ${params.supply_id};`
};


module.exports = query;