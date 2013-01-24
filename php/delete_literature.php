<?php

	error_reporting(E_ALL);

	// Get the id of the literature
	$literature_id = $_GET['id'];
	
	$topic_id = null;
	if(isset($_GET['topic_id'])){
		$topic_id = $_GET['topic_id'];
	}

	// Establish the server connection
	$dbs_connect = mysql_connect('localhost','root');
	
	// Establish the database connection
	$db_connect = mysql_select_db('critical_search_db');

	mysql_query("DELETE FROM literature WHERE id=$literature_id");

	// Close the connection
	mysql_close($dbs_connect);

	// Redirect
	if($topic_id){
		header('location: ../html/show_topic.html?'.$topic_id);
	}
	else{
		header('location: ../html/literature_index.html');
	}
	
?>