$(document).ready( function(){

	var topic_id = window.sessionStorage.topic_id;

	// Check for the previous page and construct the return URL accordingly
	if(window.sessionStorage.current_page == "topics_index" && topic_id){

		$('#ret_url').val("../html/show_topic.html?"+topic_id); 
		$('#topic_id').val(topic_id);

		//Update the navigation
		$('a[href="videos_index.html"]').removeClass('active');
		$('a[href="topics_index.html"]').addClass('active');
	}

	// Reset session storage reference
	window.sessionStorage.clear();


});