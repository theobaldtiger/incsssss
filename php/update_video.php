<?php

	error_reporting(E_ALL);

	// Get the id of the topic
	$video_id = $_POST['id'];

	// Get the remaining form data
	$video_title = mysql_real_escape_string($_POST['title']);
	$video_summary_long = mysql_real_escape_string($_POST['summary_long']);
	$video_length = (trim($_POST['length'])== "" ? "NULL" : $_POST['length']);
	$video_director = mysql_real_escape_string($_POST['director']);
	$video_year = (trim($_POST['year']) == "" ? "NULL" : $_POST['year']);
	$video_type = ""; 
	$video_url = mysql_real_escape_string($_POST['url']);
	$cover_url = mysql_real_escape_string($_POST['cover_url']);

	// Establish the server connection
	$dbs_connect = mysql_connect('localhost','root');
	
	// Establish the database connection
	$db_connect = mysql_select_db('critical_search_db');

	mysql_query("UPDATE videos SET name = '$video_title',
		summary_long = '$video_summary_long', length = $video_length, director = '$video_director', 
		year = $video_year, type = '$video_type', url = '$video_url', cover_url = '$cover_url' WHERE id=$video_id");

	// Close the connection
	mysql_close($dbs_connect);

	// Redirect
	header('location: ../html/show_video.html?'.$video_id);
?>