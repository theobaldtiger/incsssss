<?php

	error_reporting(E_ALL);

	// Get the id of the topic
	$topic_id = $_POST['id'];

	// Get the remaining form data
	$topic_title = mysql_real_escape_string($_POST['title']);
	$topic_description = mysql_real_escape_string($_POST['summary']);

	// Establish the server connection
	$dbs_connect = mysql_connect('localhost','root');
	
	// Establish the database connection
	$db_connect = mysql_select_db('critical_search_db');

	mysql_query("UPDATE topics SET name = '$topic_title', description = '$topic_description' WHERE id=$topic_id");

	// Close the connection
	mysql_close($dbs_connect);

	// Redirect
	header('location: ../html/show_topic.html?'.$topic_id);
?>