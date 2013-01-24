<?php
	error_reporting(E_ALL);

	// Establish the server connection
	$dbs_connect = mysql_connect('localhost','root');
	
	// Establish the database connection
	mysql_select_db('critical_search_db');

	// Execute the database query for selecting the data
	$definitions = mysql_query("SELECT * FROM definitions ORDER BY defined_word ASC");

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