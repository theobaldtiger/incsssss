<?php
	error_reporting(E_ALL);

	if(!isset($_POST['topic_literature'])){
		$updated_literature_ids_a = array();
	}
	else{
		$updated_literature_ids_a = $_POST['topic_literature'];
	}
	
	$topic_id = $_POST['topic_id'];
	
	// Establish the server connection
	$dbs_connect = mysql_connect('localhost','root');
	
	// Establish the database connection
	mysql_select_db('critical_search_db');

	// Get the previous set of literature associated with the topic
	$previous_literature_ids = mysql_query("SELECT literature_id FROM topics_literature WHERE topic_id=$topic_id");

	$previous_literature_ids_a = array();

	while($row = mysql_fetch_assoc($previous_literature_ids)){
		$previous_literature_ids_a[] = $row['literature_id'];
	}


	// Get the literature ids that need to be removed
	$literature_ids_delete = array_diff($previous_literature_ids_a, $updated_literature_ids_a);
	

	//for($i = 0; $i < count($literature_ids_delete);$i++){
	//	mysql_query("DELETE FROM topics_literature WHERE topic_id=$topic_id AND literature_id=$literature_ids_delete[$i]");
	//}

	foreach($literature_ids_delete as $literature_id_delete){
		mysql_query("DELETE FROM topics_literature WHERE topic_id=$topic_id AND literature_id=$literature_id_delete");
	}

	// Get the literature ids that have to be inserted
	$literature_ids_insert = array_diff($updated_literature_ids_a, $previous_literature_ids_a);

	//for($i = 0; $i < count($literature_ids_insert);$i++){
	//	mysql_query("INSERT INTO topics_literature (topic_id, literature_id) VALUES ($topic_id, $literature_ids_insert[$i])");
	//}

	foreach($literature_ids_insert as $literature_id_insert){
		mysql_query("INSERT INTO topics_literature (topic_id, literature_id) VALUES ($topic_id, $literature_id_insert)");
	}

	// Close the connection
	mysql_close($dbs_connect);

	// Redirect
	header("location: ../html/show_topic.html?$topic_id");

?>