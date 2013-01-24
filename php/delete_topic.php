<?php

	error_reporting(E_ALL);

	// Get the id of the topic
	$topic_id = $_GET['id'];

	// Establish the server connection
	$dbs_connect = mysql_connect('localhost','root');
	
	// Establish the database connection
	$db_connect = mysql_select_db('critical_search_db');

	mysql_query("DELETE FROM topics WHERE id=$topic_id");

	// Close the connection
	mysql_close($dbs_connect);

	// Redirect
	header('location: ../html/topics_index.html');
?>