<?php

	error_reporting(E_ALL);

	// Get the id of the definition
	$definition_id = $_POST['id'];

	// Get the remaining form data
	$defined_word = mysql_real_escape_string($_POST['defined_word']);
	$definition = mysql_real_escape_string($_POST['definition']);

	// Establish the server connection
	$dbs_connect = mysql_connect('localhost','root');
	
	// Establish the database connection
	$db_connect = mysql_select_db('critical_search_db');

	mysql_query("UPDATE definitions SET defined_word = '$defined_word', definition = '$definition' WHERE id=$definition_id");

	// Close the connection
	mysql_close($dbs_connect);

	// Redirect
	header('location: ../html/show_definition.html?'.$definition_id);
?>