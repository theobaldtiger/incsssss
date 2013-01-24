// Set session storage
sessionStorage.topic_id = location.search.replace('?','');
sessionStorage.current_page = "topics_index";

// Get the id from the query string
var topic_id = window.sessionStorage.topic_id;

$(document).ready( function(){

	// Is the query string a number?
	if(!isNaN(topic_id)){
		// Make AJAX-requests to receive all the information associated with a topic
		$.getJSON('../php/get_topic.php', { id: topic_id }, showTopic);
		$.getJSON('../php/get_topic_videos.php', { id: topic_id }, showVideos);
		$.getJSON('../php/get_topic_literature.php', { id: topic_id}, showLiterature)

	}
	else{
		// Back to the index if NaN
		window.location.href = "../html/topics_index.html";
	}

});

// Update the DOM with the retrieved JSON-data about the topic
function showTopic(data){

	$('#topic_title').text(data[0].name);
	$('#topic_description').text(data[0].description);

	// Update the link for the edit and delete button
	$('#edit_topic_link').attr('href','edit_topic.html?'+topic_id);
	$('#delete_topic_link').attr('href','../php/delete_topic.php?id='+topic_id);
	$('#edit_topic_videos_link').attr('href','edit_topic_videos.html?'+topic_id);
	$('#edit_topic_literature_link').attr('href','edit_topic_literature.html?'+topic_id);


}

// Update the DOM with the retrieved JSON-data about the videos associated with the topic
function showVideos(data){

	// Iterate through the response and create a list item for each video with a link to it
	for(var i=0;i<data[0].length;i++){
		$('<li>').append(
			$('<a>')
			.attr('href','show_video.html?'+data[0][i].id)
			.text(data[0][i].name)
			)
			.appendTo($('#video_list'));
	}

}

// Update the DOM with the retrieved JSON-data about the literature associated with the topic
function showLiterature(data){

	// Iterate through the response and create a list item for each book with a link to it
	for(var i=0;i<data[0].length;i++){
		$('<li>').append(
			$('<a>')
			.attr('href','show_literature.html?'+data[0][i].id)
			.text(data[0][i].title)
			)
			.appendTo($('#literature_list'));
	}

}



