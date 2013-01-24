<?php

	error_reporting(E_ALL);

	// Get the id of the definition
	$definition_id = $_GET['id'];

	// Establish the server connection
	$dbs_connect = mysql_connect('localhost','root');
	
	// Establish the database connection
	$db_connect = mysql_select_db('critical_search_db');

	mysql_query("DELETE FROM definitions WHERE id=$definition_id");

	// Close the connection
	mysql_close($dbs_connect);

	// Redirect
	header('location: ../html/definitions_index.html');
?>