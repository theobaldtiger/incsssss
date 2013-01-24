<?php
	error_reporting(E_ALL);

	if(!isset($_POST['topic_videos'])){
		$updated_video_ids_a = array();
	}
	else{
		$updated_video_ids_a = $_POST['topic_videos'];
	}
	
	$topic_id = $_POST['topic_id'];
	
	// Establish the server connection
	$dbs_connect = mysql_connect('localhost','root');
	
	// Establish the database connection
	mysql_select_db('critical_search_db');

	// Get the previous set of videos associated with the topic
	$previous_video_ids = mysql_query("SELECT video_id FROM topics_videos WHERE topic_id=$topic_id");
	$previous_video_ids_a = array();

	while($row = mysql_fetch_assoc($previous_video_ids)){
		$previous_video_ids_a[] = $row['video_id'];
	}

	// Get the video ids that need to be removed
	$video_ids_delete = array_diff($previous_video_ids_a, $updated_video_ids_a);
	

	foreach($video_ids_delete as $video_id_delete){
		mysql_query("DELETE FROM topics_videos WHERE topic_id=$topic_id AND video_id=$video_id_delete");
	}

	// Get the video ids that have to be inserted
	$video_ids_insert = array_diff($updated_video_ids_a, $previous_video_ids_a);

	foreach($video_ids_insert as $video_id_insert){
		mysql_query("INSERT INTO topics_videos (topic_id, video_id) VALUES ($topic_id, $video_id_insert)");
	}

	// Close the connection
	mysql_close($dbs_connect);

	// Redirect
	header("location: ../html/show_topic.html?$topic_id");

?>