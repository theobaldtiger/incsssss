<?php
	error_reporting(E_ALL);

	// Get the id of the topic
	$topic_id = $_GET['id'];

	// Establish the server connection
	$dbs_connect = mysql_connect('localhost','root');
	
	// Establish the database connection
	mysql_select_db('critical_search_db');

	// Execute the database query to get all the relevant information
	$topics = mysql_query("SELECT * FROM topics WHERE id=$topic_id LIMIT 1");

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