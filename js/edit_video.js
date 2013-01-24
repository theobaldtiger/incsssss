// Get the id from the query string
var video_id = location.search.replace('?','');
var topic_id = window.sessionStorage.topic_id;

$(document).ready( function(){

	// Is the query string a number?
	if(!isNaN(video_id)){
		// Make an AJAX-request to receive all the information associated with a topic
		$.getJSON('../php/get_video.php', { id: video_id }, showVideoDetails);

		// Update the navigation bar
		if(topic_id){
			$('a[href="videos_index.html"]').removeClass('active');
			$('a[href="topics_index.html"]').addClass('active');
		}
	}
	else{
		// Back to the index if NaN
		window.location.href = "topics_index.html";
	}

});

// Update the DOM with the retrieved JSON-data about the topic
function showVideoDetails(data){

	$('#title').val(data[0].name);
	$('#length').val(data[0].length);
	$('#cover_url').val(data[0].cover_url);
	$('#summary_long').val(data[0].summary_long);
	$('#director').val(data[0].director);
	$('#year').val(data[0].year);
	$('#url').val(data[0].url);

	// Also set the id as value as hidden input for further processing on the server side
	$('#video_id').val(video_id);
}