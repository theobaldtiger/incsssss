// Get the id from the query string
var literature_id = location.search.replace('?','');
var topic_id = window.sessionStorage.topic_id;

$(document).ready( function(){

	// Is the query string a number?
	if(!isNaN(literature_id)){
		// Make AJAX-requests to receive all literature information
		$.getJSON('../php/get_literature.php', { id: literature_id }, showLiteratureDetails);

		// Update the link references on the site
		$('#edit_literature_link').attr('href','edit_literature.html?'+literature_id);
		
		// Does the topic id exist?
		if(topic_id){
			$('#topic_link').attr('href','show_topic.html?'+topic_id);
			$('#delete_literature_link').attr('href','../php/delete_literature.php?topic_id='+topic_id+'&id='+literature_id);

			// Update the navigation
			$('a[href="literature_index.html"]').removeClass('active');
			$('a[href="topics_index.html"]').addClass('active');
		}
		// Else: Send back to index
		else{
			$('#topic_link').attr('href','literature_index.html');
			$('#delete_literature_link').attr('href','../php/delete_literature.php?id='+literature_id);

		}		

	}
	else{
		// Back to the index if NaN
		window.location.href = "../html/literature_index.html";
	}

});

// Update the DOM with the retrieved JSON-data about the literature details
function showLiteratureDetails(data){

	var type = data[0].type;

	// Title type and summary are always present
	$('#title').text(data[0].title);
	$('#type').text(data[0].type.capitalizeAndSplit());
	$('#summary').text(data[0].summary);

	// If the data is present, show it; otherwise show "n/a"
	data[0].number_of_pages ? $('#number_of_pages').text(data[0].number_of_pages) : $('#number_of_pages').text("n/a");
	data[0].author ? $('#author').text(data[0].author) : $('#author').text("n/a");
	data[0].publication_date ? $('#publication_date').text(data[0].publication_date) : $('#publication_date').text("n/a");
	data[0].url ? $('#url_wrapper').append($('<a>').attr('href',data[0].url).text(data[0].url)) : $('#url_wrapper').append($('<span>').text("n/a"));
	
	// Depending on the literature type, different fields are shown
	type == "book" ? (data[0].edition ? $('#edition').text(data[0].edition) : $('#edition').text("n/a")) : $('#edition_wrapper').hide();
	type == "book" ? (data[0].publisher ? $('#publisher').text(data[0].publisher) : $('#publisher').text("n/a")) : $('#publisher_wrapper').hide();
	type == "book" ? (data[0].cover_url ? $('#literature_cover').attr('src',data[0].cover_url) : $('#literature_cover').hide() ): $('#literature_cover').hide();
	type == "book" ? (data[0].isbn_10 ? $('#isbn_10').text(data[0].isbn_10) : $('#isbn_10').text("n/a")) : $('#isbn_10_wrapper').hide();
	type == "book" ? (data[0].isbn_13 ? $('#isbn_13').text(data[0].isbn_13) : $('#isbn_13').text("n/a")) :$('#isbn_13_wrapper').hide();
	type == "scientific_article" ? (data[0].doi ? $('#doi').text(data[0].doi) : $('#doi').text("n/a")): $('#doi_wrapper').hide();
	type == "scientific_article" ? (data[0].journal_name ? $('#journal_name').text(data[0].journal_name) : $('#journal_name').text("n/a")): $('#journal_name_wrapper').hide();
	type == "magazine_article" ? (data[0].magazine_name ? $('#magazine_name').text(data[0].magazine_name) : $('#magazine_name').text("n/a")): $('#magazine_name_wrapper').hide();
	type == "newspaper_article" ? (data[0].newspaper_name ? $('#newspaper_name').text(data[0].newspaper_name) : $('#newspaper_name').text("n/a")): $('#newspaper_name_wrapper').hide();
	type == "blogpost" ? (data[0].blog_name ? $('#blog_name').text(data[0].blog_name) : $('#blog_name').text("n/a")) : $('#blog_name_wrapper').hide();
	

}

// Capitalize the given string and remove the underscore

String.prototype.capitalizeAndSplit = function() {
    return (this.charAt(0).toUpperCase() + this.slice(1)).replace('_',' ');
}

