const basicSelect = parameters =>
	`SELECT ${parameter} 
	FROM Account 
	WHERE ${parameter} = '${data}';`;
	
const checkUser = payload =>
	`SELECT Password
	FROM ACCOUNT
	WHERE EMAIL = '${payload.email}';`;
	
const checkAccount = payload =>
	`SELECT *
	FROM (
	SELECT Password
	FROM Account
	WHERE Email = '${payload.email}'
	) AS t
	WHERE Password = '${payload.password}';`;

const addUser = payload => 
	`INSERT INTO Account(
		Name,
		Email,
		Password,
		Location,
		isSupplier
	) VALUES (
		'${payload.name}',
		'${payload.email}',
		'${payload.password}',
		'${payload.location}',
		${payload.isSupplier}
	);`;

const changePassword = payload =>
    `UPDATE Account 
    SET Password = '${payload.newpassword}'
    WHERE Email = '${payload.email}';`;

const deleteJobSupplies = payload =>
	`DELETE FROM SupplyList
	WHERE JobList_ID = '${payload.list_id}';`;

const deleteJob = payload =>
	`DELETE FROM Job
	WHERE List_ID = '${payload.list_id}';`;

const addJob = payload =>
	`INSERT INTO Job(
        Construction_ID,
        Job_Title,
        Location,
        Budget,
        Completion_Date
    ) Values (
        '${payload.construction_id}',
        '${payload.job_title}',
        '${payload.location}',
        '${payload.budget}',
        '${payload.completion_date}'
    );`;
const addSupplyToSupplyList = payload  =>
    `INSERT INTO SupplyList(
	Job_ID,
	Quantity,
	Supply_ID
	) Values (
		'${payload.job_id}',
		'${payload.quantity}',
		'${payload.supply_id}'
	);`;
	
const addSupplyToSupplyListMultiple = payloadstring =>
`INSERT INTO SupplyList(
	Job_ID,
	Quantity,
	Supply_ID
	) Values 
	${payloadstring}
	ON DUPLICATE KEY UPDATE Quantity = Quantity + values(Quantity); 
	;`;

const addSupply = payload =>
	`INSERT INTO Supplies
	( 
		Supplier_ID,
		Name,
	    	Tags,
	    	Price
	)  Values (
		'${payload.supplier_id}',
		'${payload.name}',
		'${payload.tags}',
		'${payload.price}'
	);`;

const viewSupplies = payload =>
	`Select Supplier_ID, s.Name AS product_name, Price, a.Name AS supplier_name
	FROM Supplies s inner join Account a
	ON s.Supplier_ID = a.ID;`;

const viewSuppliesTagged = params =>
	`Select Supplier_ID, s.Name AS product_name, Price, a.Name AS supplier_name
	FROM 
		Supplies s 
	INNER JOIN 
		Account a
	ON s.Supplier_ID = a.ID
	WHERE Tags LIKE '%${params.tag}%' OR s.Name LIKE '%${params.tag}%';`;

const viewSuppliesTaggedMultiple = params =>
	`Select Supplier_ID, s.Name AS product_name, Price, a.Name AS supplier_name
	FROM 
		Supplies s 
	INNER JOIN 
		Account a
	ON s.Supplier_ID = a.ID
	WHERE ${params.tag};`;

const viewSuppliesSortedASC = params =>
	`Select Supplier_ID, s.Name AS product_name, Price, a.Name AS supplier_name
	FROM 
	Supplies s 
	INNER JOIN 
	Account a
	ON s.Supplier_ID = a.ID
	WHERE Tags LIKE '%${params.tag}%' OR s.Name LIKE '%${params.tag}%'
	ORDER BY Price ASC;`;

const viewSuppliesSortedDSC = params =>
	`Select Supplier_ID, s.Name AS product_name, Price, a.Name AS supplier_name
	FROM 
	Supplies s 
	INNER JOIN 
	Account a
	ON s.Supplier_ID = a.ID
	WHERE Tags LIKE '%${params.tag}%' OR s.Name LIKE '%${params.tag}%'
	ORDER BY Price DESC;`;

const postReview = request =>
    `INSERT INTO Review(
            Author_ID,
            Supplier_ID, 
            Date_Created,
            Title,
            Body,
            Rating
        ) VALUES (
            ${request.payload.author_id},
            ${request.params.supplier_id},
            "${request.payload.date}",
            "${request.payload.title}",
            "${request.payload.body}",
            ${request.payload.rating}
		);`;
		
const retrieveReviews = payload =>
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
        FROM Review JOIN Account ON Account.ID = Review_ID 
        WHERE Supplier_ID = '${payload.supplier_id}'
    ) t LEFT JOIN Comment 
    ON t.Review_ID = Comment.Review_ID
	Order By t.Date_Created;`;
	
const deleteReview = (payload, params) =>
    `DELETE FROM Review
        WHERE Supplier_ID = '${params.supplier_id}'
		AND Author_ID = '${payload.author_id}';`;
		
const updateAvgScore = payload =>
    `UPDATE Account
        SET Rating = (
            SELECT AVG(Rating)
            FROM Review
            WHERE Supplier_ID = '${payload.supplier_id}'
        )
		WHERE ID = '${payload.supplier_id}';`;
		
const isSupplier = params =>
    `SELECT isSupplier
        FROM Account
		WHERE ID = '${params.supplier_id}';`;
		
const authorIsSupplier = payload =>
    `SELECT isSupplier
        FROM Account
		WHERE ID = '${payload.author_id}';`;
		
const alreadyReviewed = (payload, params) =>
    `SELECT *
        FROM Review
        WHERE Supplier_ID = '${params.supplier_id}'
        AND Author_ID = '${payload.author_id}';`;
	
module.exports = {
	basicSelect,
	addUser,
	checkUser,
	checkAccount,
	changePassword,
	addJob,
	deleteJob,
	deleteJobSupplies,
	addSupply,
	viewSupplies,
	viewSuppliesTagged,
	viewSuppliesTaggedMultiple,
	viewSuppliesSortedASC,
	viewSuppliesSortedDSC,
	postReview,
	retrieveReviews,
	deleteReview,
	updateAvgScore,
	isSupplier,
	authorIsSupplier,
	alreadyReviewed,
	addSupplyToSupplyList,
	addSupplyToSupplyListMultiple
};
