// Get the id from the query string
var literature_id = location.search.replace('?','');
var topic_id = window.sessionStorage.topic_id;

$(document).ready( function(){

	// Is the query string a number?
	if(!isNaN(literature_id)){
		// Make an AJAX-request to receive all the information associated with a topic
		$.getJSON('../php/get_literature.php', { id: literature_id }, showLiteratureDetails);

		// Update the navigation bar
		// Update the navigation
		if(topic_id){
			$('a[href="literature_index.html"]').removeClass('active');
			$('a[href="topics_index.html"]').addClass('active');
		}

	}
	else{
		// Back to the index if NaN
		window.location.href = "topics_index.html";
	}

	// Handle the change of the literature type
	$('#type').change(handleTypeChange);

});

// Update the DOM with the retrieved JSON-data about the topic
function showLiteratureDetails(data){

	$('#title').val(data[0].title);
	$('#type').val(data[0].type);
	$('#number_of_pages').val(data[0].number_of_pages);
	$('#cover_url').val(data[0].cover_url);
	$('#summary').val(data[0].summary);
	$('#author').val(data[0].author);
	$('#isbn_10').val(data[0].isbn_10);
	$('#isbn_13').val(data[0].isbn_13);
	$('#doi').val(data[0].doi);
	$('#journal_name').val(data[0].journal_name);
	$('#magazine_name').val(data[0].magazine_name);
	$('#newspaper_name').val(data[0].newspaper_name);
	$('#blog_name').val(data[0].blog_name);
	$('#edition').val(data[0].edition);
	$('#publication_date').val(data[0].publication_date);
	$('#publisher').val(data[0].publisher);
	$('#url').val(data[0].url);

	// Also set the id as value as hidden input for further processing on the server side
	$('#literature_id').val(literature_id);

	// Check the type at first run
	handleTypeChange();
}

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

