<?php
	error_reporting(E_ALL);

	// Get the form data
	$topic_title = mysql_real_escape_string($_POST['title']);
	$topic_description = mysql_real_escape_string($_POST['summary']);

	// Establish the server connection
	$dbs_connect = mysql_connect('localhost','root');
	
	// Establish the database connection
	$db_connect = mysql_select_db('critical_search_db');

	// Execute the database query for inserting the data
	mysql_query("INSERT INTO topics (name, description) VALUES ('$topic_title', '$topic_description')");

	// Close the connection
	mysql_close($dbs_connect);

	// Redirect
	header('location: ../html/topics_index.html');
?>