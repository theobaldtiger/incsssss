<?php
	error_reporting(E_ALL);

	// Get the id of the definition
	$definition_id = $_GET['id'];

	// Establish the server connection
	$dbs_connect = mysql_connect('localhost','root');
	
	// Establish the database connection
	mysql_select_db('critical_search_db');

	// Execute the database query to get all the relevant information
	$definitions = mysql_query("SELECT * FROM definitions WHERE id=$definition_id LIMIT 1");

	// Iterate through the results and add each result row to an array
	$definitions_array = array();

	while($row = mysql_fetch_assoc($definitions)){
		$definitions_array[] = $row;
	}

	// Return the JSON-Response
	echo json_encode($definitions_array);

	// Close the connection
	mysql_close($dbs_connect);

?>