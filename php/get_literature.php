<?php
	error_reporting(E_ALL);

	// Get the id of the topic
	$literature_id = $_GET['id'];

	// Establish the server connection
	$dbs_connect = mysql_connect('localhost','root');
	
	// Establish the database connection
	mysql_select_db('critical_search_db');

	// Execute the database query to get all the relevant information
	$video = mysql_query("SELECT * FROM literature WHERE id=$literature_id LIMIT 1");

	// Iterate through the results and add each result row to an array
	$literature_array= array();

	while($row = mysql_fetch_assoc($video)){
		$literature_array[] = $row;
	}

	// Capitalize the type and replace the _ with a space
	$literature_array[0]['type'] = $literature_array[0]['type'];

	// Return the JSON-Response
	echo json_encode($literature_array);

	// Close the connection
	mysql_close($dbs_connect);

?>