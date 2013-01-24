<?php
	error_reporting(E_ALL);

	$topic_id = $_GET['id'];

	// Establish the server connection
	$dbs_connect = mysql_connect('localhost','root');
	
	// Establish the database connection
	mysql_select_db('critical_search_db');

	// Execute the database query for selecting the data
	$topic_videos = mysql_query("SELECT * FROM videos v, topics_videos tv 
		WHERE v.id = tv.video_id AND tv.topic_id=$topic_id ORDER BY v.name ASC");

	$videos = mysql_query("SELECT * FROM videos ORDER BY name ASC");

	// Iterate through the results and add each result row to an array
	$topic_videos_array = array();

	// In the first position, all the videos are stored that are currently associated with the topic
	if(mysql_num_rows($topic_videos)>0){
		while($row = mysql_fetch_assoc($topic_videos)){
		$topic_videos_array[0][] = $row;
		}
	}
	else{
		$topic_videos_array[0] = array();
	}
	
	// In the second position, all videos are stored
	if(mysql_num_rows($videos)>0){
		while($row = mysql_fetch_assoc($videos)){
		$topic_videos_array[1][] = $row;
		}
	}
	else{
		$topic_videos_array[1] = array();
	}

	

	// Return the JSON-Response
	echo json_encode($topic_videos_array);

	// Close the connection
	mysql_close($dbs_connect);

?>