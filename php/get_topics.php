<?php
	error_reporting(E_ALL);

	// Establish the server connection
	$dbs_connect = mysql_connect('localhost','root');
	
	// Establish the database connection
	mysql_select_db('critical_search_db');

	// Execute the database query for selecting the data
	$topics = mysql_query("SELECT * FROM topics ORDER BY name ASC");

	// Iterate through the results and add each result row to an array
	$topics_array = array();

	while($row = mysql_fetch_assoc($topics)){
		$topics_array[] = $row;
	}

	// Return the JSON-Response
	echo json_encode($topics_array);

	// Close the connection
	mysql_close($dbs_connect);



?>