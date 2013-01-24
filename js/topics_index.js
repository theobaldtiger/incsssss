$(document).ready( function(){

	// Make an AJAX-request to retrieve all topics from the database
	$.getJSON('../php/get_topics.php', updateTopicList);

});

// Handle the JSON-response
function updateTopicList(data){

	// Iterate through the response and create a list item for each topic with a link to it

	for(var i=0;i<data.length;i++){
		$('<li>').append(
			$('<a>')
			.attr('href','show_topic.html?'+data[i].id)
			.text(data[i].name)
			)
			.appendTo($('#topic_list'));
	}

}