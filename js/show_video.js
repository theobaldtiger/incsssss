// Get the id from the query string
var video_id = location.search.replace('?','');
var topic_id = window.sessionStorage.topic_id;

$(document).ready( function(){
	// Is the query string a number?
	if(!isNaN(video_id)){
		// Make AJAX-requests to receive all video information
		$.getJSON('../php/get_video.php', { id: video_id }, showVideoDetails);

		// Update the link references on the site

		$('#edit_video_link').attr('href','edit_video.html?'+video_id);
		// Does the topic id exist?
		if(topic_id){
			$('#topic_link').attr('href','show_topic.html?'+topic_id);
			$('#delete_video_link').attr('href','../php/delete_video.php?topic_id='+topic_id+'&id='+video_id);

			// Update the navigation bar
			$('a[href="videos_index.html"]').removeClass('active');
			$('a[href="topics_index.html"]').addClass('active');
		}
		// Else: Send back to video index
		else{
			$('#topic_link').attr('href','videos_index.html');
			$('#delete_video_link').attr('href','../php/delete_video.php?id='+video_id);
		}
	}
	else{
		// Back to the index if NaN
		window.location.href = "../html/videos_index.html";
	}

});

// Update the DOM with the retrieved JSON-data about the video details
function showVideoDetails(data){ 

	// Title and summary are always present
	$('#title').text(data[0].name);
	$('#summary_long').text(data[0].summary_long);

	data[0].cover_url ? $('#video_cover').attr('src',data[0].cover_url) : $('#video_cover').hide();
	data[0].length ? $('#length').text(data[0].length+" min") : $('#length').text("n/a");
	data[0].director ? $('#director').text(data[0].director) : $('#director').text("n/a");
	data[0].year ? $('#year').text(data[0].year) : $('#year').text("n/a");
	
	// If a Youtube-URL exists, it is embedded directly
	var youtube_regexp = /^http:\/\/www.youtube.com\/embed\//;

	if(!data[0].url) {
		$('#url_wrapper').append($('<span>').text("n/a"));
	}
	else{
		$('#url_wrapper').append($('<a>').attr('href',data[0].url).text(data[0].url));
			
		// Check for Youtube-embed link
		if(youtube_regexp.test(data[0].url)) {
			var yt_iframe = $('<iframe>')
				.attr('id','yt_player')
				.attr('src',data[0].url);
			$('#video_details').append(yt_iframe);
		}
	}	
}
