// Get the id from the query string
var topic_id = location.search.replace('?','');

$(document).ready( function(){

	// Is the query string a number?
	if(!isNaN(topic_id)){
		// Make an AJAX-request to receive all the information associated with a topic
		$.getJSON('../php/get_topic.php', { id: topic_id }, showTopic);
	}
	else{
		// Back to the index if NaN
		window.location.href = "topics_index.html";
	}

});

// Update the DOM with the retrieved JSON-data about the topic
function showTopic(data){

	$('#title').val(data[0].name);
	$('#summary').val(data[0].description);
	// Also set the id as value as hidden input for further processing on the server side
	$('#topic_id').val(topic_id);

}