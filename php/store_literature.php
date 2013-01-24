<?php
	error_reporting(E_ALL);

	// Get the form data
	$return_url;

	// If a topic id is present, we can use it to set up the literature - topic association
	$topic_id = $_POST['topic_id'];
	$title = mysql_real_escape_string($_POST['title']);
	$type = $_POST['type'];
	$summary = mysql_real_escape_string($_POST['summary']);
	// If # of pages = '' => NULL
	$number_of_pages = (trim($_POST['nr_of_pages']) == "" ? "NULL" : $_POST['nr_of_pages']);
	$cover_url = mysql_real_escape_string($_POST['cover_url']);
	$author = mysql_real_escape_string($_POST['author']);
	$isbn_10 = $_POST['isbn_10'];
	$isbn_13 =  $_POST['isbn_13'];
	$doi = $_POST['doi'];
	$journal_name = mysql_real_escape_string($_POST['journal_name']);
	$magazine_name = mysql_real_escape_string($_POST['magazine_name']);
	$newspaper_name = mysql_real_escape_string($_POST['newspaper_name']);
	$blog_name = mysql_real_escape_string($_POST['blog_name']);
	// If edition = '' => NULL
	$edition = (trim($_POST['edition']) == "" ? "NULL" : $_POST['edition']);
	$publication_date = $_POST['publication_date'];
	// If date = '' => NULL
	$publication_date = (trim($_POST['publication_date']) == "" ? "NULL" : "'".$_POST['publication_date']."'");
	$publisher = mysql_real_escape_string($_POST['publisher']);
	$url = mysql_real_escape_string($_POST['url']);

	// Establish the server connection
	$dbs_connect = mysql_connect('localhost','root');
	
	// Establish the database connection
	$db_connect = mysql_select_db('critical_search_db');
	
	// Execute the database query for inserting the data
	mysql_query("INSERT INTO literature (title, type, summary, number_of_pages, author, isbn_10, isbn_13, doi, journal_name, magazine_name, 
		newspaper_name, blog_name, edition, publication_date, publisher, url, cover_url) VALUES ('$title', '$type', '$summary', $number_of_pages, '$author', '$isbn_10', '$isbn_13', '$doi', '$journal_name', '$magazine_name', 
			'$newspaper_name', '$blog_name', $edition, $publication_date, '$publisher', '$url', '$cover_url')");

	// Get the last literature id
	$db_result = mysql_query("SELECT id FROM literature ORDER BY id DESC LIMIT 1");
	$literature_id = mysql_fetch_row($db_result);

	// Update the topic - literature association
	if(!empty($topic_id)){

		mysql_query("INSERT INTO topics_literature (topic_id, literature_id) VALUES ($topic_id, $literature_id[0])");
	}


	// Has the return url been set? 
	if(!empty($_POST['ret_url'])) {
		$return_url = $_POST['ret_url'];
	}
	// if not: send back to default
	else{
		$return_url = "../html/show_literature.html?".$literature_id[0];
	}

	// Close the connection
	mysql_close($dbs_connect);

	// Redirect
	header('location: '.$return_url);
?>