<?php
	error_reporting(E_ALL);

	// Get the form data
	$defined_word = mysql_real_escape_string($_POST['defined_word']);
	$definition = mysql_real_escape_string($_POST['definition']);
	

	// Establish the server connection
	$dbs_connect = mysql_connect('localhost','root');
	
	// Establish the database connection
	$db_connect = mysql_select_db('critical_search_db');

	// Execute the database query for inserting the data
	mysql_query("INSERT INTO definitions (defined_word, definition) VALUES ('$defined_word', '$definition')");

	// Close the connection
	mysql_close($dbs_connect);

	// Redirect
	header('location: ../html/definitions_index.html');
?>