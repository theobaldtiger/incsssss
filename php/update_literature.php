<?php

	error_reporting(E_ALL);

	// Get the id of the literature
	$literature_id = $_POST['id'];

	// Get the form data
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
	// If date = '' => NULL
	$publication_date = (trim($_POST['publication_date']) == "" ? "NULL" : "'".$_POST['publication_date']."'");
	$publisher = mysql_real_escape_string($_POST['publisher']);
	$url = mysql_real_escape_string($_POST['url']);

	// Establish the server connection
	$dbs_connect = mysql_connect('localhost','root');
	
	// Establish the database connection
	$db_connect = mysql_select_db('critical_search_db');

	// Select the right query
	mysql_query("UPDATE literature SET title = '$title', type = '$type', summary = '$summary', number_of_pages = $number_of_pages, 
		author = '$author', isbn_13 = '$isbn_13', isbn_10 = '$isbn_10', doi = '$doi', journal_name = '$journal_name',
		magazine_name = '$magazine_name', newspaper_name = '$newspaper_name', blog_name = '$blog_name', 
		edition = $edition, publication_date = $publication_date , publisher = '$publisher', 
		url = '$url' , cover_url = '$cover_url' WHERE id=$literature_id");

	mysql_error($dbs_connect);

	// Close the connection
	mysql_close($dbs_connect);

	// Redirect
	header('location: ../html/show_literature.html?'.$literature_id);
?>