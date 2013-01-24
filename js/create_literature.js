$(document).ready( function(){

	// Check the type at first run
	handleTypeChange();

	var topic_id = window.sessionStorage.topic_id;

	// Handle the change of the literature type
	$('#type').change(handleTypeChange);

	// Check for the previous page and construct the return URL accordingly
	if(window.sessionStorage.current_page == "topics_index" && topic_id){

		$('#ret_url').val("../html/show_topic.html?"+topic_id); 
		$('#topic_id').val(topic_id);

		// Update the navigation bar
		$('a[href="literature_index.html"]').removeClass('active');
		$('a[href="topics_index.html"]').addClass('active');
	}

	// Reset session storage reference
	window.sessionStorage.clear();
});

// Handle the type change
function handleTypeChange(){
	var type = $('#type option:selected').val();
	// Depending on the type, hide or show certain input values
	if(type=="book"){
		$('#search_bt').show();
		$('#isbn_10_wrapper').show();
		$('#isbn_13_wrapper').show();
		$('#edition_wrapper').show();
		$('#publisher_wrapper').show();

		$('#doi_wrapper').hide();
		$('#journal_name_wrapper').hide();
		$('#newspaper_name_wrapper').hide();
		$('#magazine_name_wrapper').hide();
		$('#blog_name_wrapper').hide();
	}
	else if(type=="scientific_article"){
		$('#doi_wrapper').show();
		$('#journal_name_wrapper').show();

		$('#search_bt').hide();
		$('#literature_select_wrapper').hide();
		$('#isbn_10_wrapper').hide();
		$('#isbn_13_wrapper').hide();
		$('#magazine_name_wrapper').hide();
		$('#newspaper_name_wrapper').hide();
		$('#blog_name_wrapper').hide();
		$('#edition_wrapper').hide();
		$('#publisher_wrapper').hide();
	}
	else if(type=="magazine_article"){

		$('#magazine_name_wrapper').show();

		$('#search_bt').hide();
		$('#literature_select_wrapper').hide();
		$('#doi_wrapper').hide();
		$('#isbn_10_wrapper').hide();
		$('#isbn_13_wrapper').hide();
		$('#journal_name_wrapper').hide();
		$('#newspaper_name_wrapper').hide();
		$('#blog_name_wrapper').hide();
		$('#edition_wrapper').hide();
		$('#publisher_wrapper').hide();
	}
	else if(type=="newspaper_article"){

		$('#newspaper_name_wrapper').show();

		$('#search_bt').hide();
		$('#literature_select_wrapper').hide();
		$('#doi_wrapper').hide();
		$('#isbn_10_wrapper').hide();
		$('#isbn_13_wrapper').hide();
		$('#journal_name_wrapper').hide();
		$('#magazine_name_wrapper').hide();
		$('#blog_name_wrapper').hide();
		$('#edition_wrapper').hide();
		$('#publisher_wrapper').hide();
	}
	else if(type=="blogpost"){

		$('#blog_name_wrapper').show();

		$('#search_bt').hide();
		$('#literature_select_wrapper').hide();
		$('#doi_wrapper').hide();
		$('#isbn_10_wrapper').hide();
		$('#isbn_13_wrapper').hide();
		$('#journal_name_wrapper').hide();
		$('#magazine_name_wrapper').hide();
		$('#newspaper_name_wrapper').hide();
		$('#edition_wrapper').hide();
		$('#publisher_wrapper').hide();
	}

}