// Get the id from the query string
var topic_id = location.search.replace('?','');

$(document).ready( function(){

	// Is the query string a number?
	if(!isNaN(topic_id)){	
		// Make an AJAX-request to retrieve all topics from the database
		$.getJSON('../php/get_topic_videos.php', { id: topic_id }, setVideoAssociations);
	}
	else{
		alert(topic_id);
		// Back to the index if NaN
		window.location.href = "../html/topics_index.html";
	}

});

// Handle the JSON-response
function setVideoAssociations(data){

	// Append a hidden input field with the id of the topic
	$('<input>')
		.attr('type','hidden')
		.attr('name','topic_id')
		.val(topic_id)
		.appendTo($('#topic_video_wrapper'));


	// Iterate through all videos and create a checkbox for each
	for(var i=0;i<data[1].length;i++){

		// Is the current video already associated with the topic?
		var checked = false;

		for(var j=0;j<data[0].length;j++){
			if(data[1][i].id==data[0][j].id){
				checked=true;
			}
		}

		// Add the label
		$('<label>')
			.attr('for','video_'+data[1][i].id)
			.text(data[1][i].name)
			.appendTo($('#topic_video_wrapper'));

		// Add the checkbox

		if(checked==false){
			$('<input>')
				.attr('id','video_'+data[1][i].id)
				.attr('name','topic_videos[]')
				.attr('value',data[1][i].id)
				.attr('type','checkbox')
				.appendTo($('#topic_video_wrapper'));
		}
		else{
			$('<input>')
				.attr('id','video_'+data[1][i].id)
				.attr('name','topic_videos[]')
				.attr('value',data[1][i].id)
				.attr('type','checkbox')
				.attr('checked','checked')
				.appendTo($('#topic_video_wrapper'));
		}

		// Add a line break
		$('<br>').appendTo($('#topic_video_wrapper'));
	}

}