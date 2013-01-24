<?php
	error_reporting(E_ALL);

	// Get the form data
	$return_url;


	// If a topic id is present, we can use it to set up the literature - topic association
	$topic_id = $_POST['topic_id'];
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

	// Execute the database query for inserting the data
	mysql_query("INSERT INTO videos (name, length, summary_long, director, year, type, url, cover_url) VALUES 
		('$video_title', $video_length, '$video_summary_long', '$video_director', $video_year,
		 '$video_type', '$video_url', '$cover_url')");


	// Get the last video id
	$db_result = mysql_query("SELECT id FROM videos ORDER BY id DESC LIMIT 1");
	$video_id = mysql_fetch_row($db_result);

	// Update the topic - video association
	if(!empty($topic_id)){
		mysql_query("INSERT INTO topics_videos (topic_id, video_id) VALUES ($topic_id, $video_id[0])");
	}

	// Has the return url been set? 
	if(!empty($_POST['ret_url'])) {
		$return_url = $_POST['ret_url'];
	}
	// if not: send back to default
	else{
		$return_url = "../html/show_video.html?".$video_id[0];
	}
	// Close the connection
	mysql_close($dbs_connect);

	// Redirect
	header('location: '.$return_url);
?>