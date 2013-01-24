<?php
	error_reporting(E_ALL);

	// Get the form inputs
	$name = $_POST['login_name'];
	$password = $_POST['password'];

	// Establish the server connection
	$dbs_connect = mysql_connect('localhost','root');
	
	// Establish the database connection
	mysql_select_db('critical_search_db');


	// Execute the database query
	$users = mysql_query("SELECT * FROM users WHERE name = '$name' AND password = '$password'");

	// Iterate through the results and add each result row to an array
	$users_array = array();

	while($row = mysql_fetch_assoc($users)){
		$users_array[] = $row;
	}

	// Prepare the output
	$output = array();

	if(count($users_array)==0){
		$output['error'] = 'Login was not successful';
	}
	else if(count($users_array)==1){
		$output['success'] = $name;
	}
	// Return the JSON-Response
	echo json_encode($output);

	// Close the connection
	mysql_close($dbs_connect);


?>