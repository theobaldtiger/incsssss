$(document).ready( function(){

	// Make an AJAX-request to retrieve all videos from the database
	$.getJSON('../php/get_videos.php', updateVideoList);

	// Reset session storage reference
	sessionStorage.clear();
});

// Handle the JSON-response
function updateVideoList(data){

	// Iterate through the response and create a list item for each video with a link to it

	for(var i=0;i<data.length;i++){
		$('<li>').append(
			$('<a>')
			.attr('href','show_video.html?'+data[i].id)
			.text(data[i].name)
			)
			.appendTo($('#video_list'));
	}

}