<?php
	error_reporting(E_ALL);

	$topic_id = $_GET['id'];

	// Establish the server connection
	$dbs_connect = mysql_connect('localhost','root');
	
	// Establish the database connection
	mysql_select_db('critical_search_db');

	// Execute the database query for selecting the data
	$topic_literature = mysql_query("SELECT * FROM literature l, topics_literature tl 
		WHERE l.id = tl.literature_id AND tl.topic_id=$topic_id ORDER BY title ASC");

	$literature = mysql_query("SELECT * FROM literature ORDER BY title ASC");

	// Iterate through the results and add each result row to an array
	$topic_literature_array = array();

	// In the first position, all the literature is stored that is currently associated with the topic
	if(mysql_num_rows($topic_literature)>0){
		while($row = mysql_fetch_assoc($topic_literature)){
			$topic_literature_array[0][] = $row;
		}
	}
	else{
		$topic_literature_array[0] = array();
	}
	
	// In the second position, all literature is stored
	if(mysql_num_rows($literature)>0){
		while($row = mysql_fetch_assoc($literature)){
			$topic_literature_array[1][] = $row;
		}
	}
	else{
		$topic_literature_array[1] = array();
	}

	// Return the JSON-Response
	echo json_encode($topic_literature_array);

	// Close the connection
	mysql_close($dbs_connect);

?>