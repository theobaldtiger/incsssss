$(document).ready( function() {

	// Hide the literature select wrapper
	$('#literature_select_wrapper').hide();
	$('#search_bt').hide();

	// Search button is clicked -> Get initial literature list from Google Books
	$('#search_bt').click( searchOnline );

	// Literature is selected -> Get data from Google Books
	$('#literature_select_bt').click( function(){
		getGoogleLiteratureData();
		$('#literature_load_status').text('');
		$('#literature_select_wrapper').hide();
	});

	// Cancel button is clicked
	$('#literature_cancel_bt').click( function(){
		$('#literature_load_status').text('');
		$('#literature_select').empty();
		$('#literature_select_wrapper').hide();
	});

});

function searchOnline(){
	// Get the title from the input
	var title = $('#title').val();

	// Check length
	if(title.length>0){
		$('#literature_select').empty();
		getLiteratureList(title);
	}
}

// Get a list of matching literature from Google Books
function getLiteratureList(query){

	// Clean literature select at firsts
	cleanLiterature();

	var search_url = 'https://www.googleapis.com/books/v1/volumes?q=intitle:'+query+'&orderBy=relevance'
	+'&maxResults=20&langRestrict=EN&projection=lite&callback=?';
	search_url = encodeURI(search_url);

	// Make the JSON-request
	$.getJSON(search_url, function(data){
		if(data.error){
			$('#literature_load_status').addClass('empty').text('Google seems to have some issues with their API. Please try again soon.');
		}
		else{
			var nr_literature_found = data.totalItems;
			// # of found literatures > 0?
			if(nr_literature_found >0){
				$('#literature_load_status').addClass('success');

				var literature = data.items;
				$('#literature_load_status').text(literature.length+' results found');

				// Sort the literature by year
				literature.sort( function(a,b){
					if(a.volumeInfo.publishedDate&&b.volumeInfo.publishedDate){
						var year_a = a.volumeInfo.publishedDate.substr(0,4);
						var year_b = b.volumeInfo.publishedDate.substr(0,4);
						return year_b-year_a;
					}
				})

				// Create an option for each literature found
				for(var i=0;i<literature.length;i++){
					var pub_date;
					var title;

					pub_date = (literature[i].volumeInfo.publishedDate) ? literature[i].volumeInfo.publishedDate.substr(0,4) : "n/a";
					title = (literature[i].volumeInfo.title) ? literature[i].volumeInfo.title.substr(0,70) : "n/a"

					$('<option>')
						.val(literature[i].id)
						.text(title+' ('+pub_date+')')
						.appendTo($('#literature_select'));
				}

				$('#literature_select_wrapper').show();
				$('#literature_select').show();
				$('#literature_select_bt').show();
				$('#literature_cancel_bt').show();
			}
			else{
				$('#literature_select_wrapper').show();
				$('#literature_load_status').text('0 results found');
				$('#literature_load_status').addClass('empty');
				$('#literature_select').hide();
				$('#literature_select_bt').hide();
				$('#literature_cancel_bt').hide();
			}
		}
	});
	
}

// Get the literature information from Google Books
function getGoogleLiteratureData(){

	// What is the id of the selected literature?
	var literature_id = $('#literature_select option:selected').val();
	var literature_url = 'https://www.googleapis.com/books/v1/volumes/'+literature_id+'?projection=full&callback=?';
	

	//Make the request for a specific movie
	$.getJSON(literature_url,function(d){
		var data = d.volumeInfo;

		// Update the DOM; As not all fields have to be present, an existence check has to be carried out first
		
		// Title
		if(data.title){
			if(data.subtitle){
				$('#title').val(data.title+' '+data.subtitle);
			}
			else{
				$('#title').val(data.title);
			}
		}

		// Thumbnail
		if(data.imageLinks){
			if(data.imageLinks.thumbnail){
				$('#cover_url').val(data.imageLinks.thumbnail);
			}
			
		}
		
		// Summary
		if(data.description){
			var summary = $('<div>').html(data.description);
			// Strip the HTML
			$('#summary').val(summary.text());
		}
		
		// Page count
		if(data.pageCount){
			$('#number_of_pages').val(data.pageCount);
		}
		
		// Author
		if(data.authors[0]){
			$('#author').val(data.authors[0]);
		}

		// Publisher
		if(data.publisher){
			$('#publisher').val(data.publisher);
		}

		// publication date
		if(data.publishedDate){
			$('#publication_date').val(data.publishedDate);
		}

		// ISBN-10
		if(data.industryIdentifiers){
			if(data.industryIdentifiers[0].type=="ISBN_10" &&!isNaN(data.industryIdentifiers[0].identifier)){
				$('#isbn_10').val(data.industryIdentifiers[0].identifier);
			}
		}

		// ISBN-13
		if(data.industryIdentifiers[1]){
			if(data.industryIdentifiers[1].type=="ISBN_13"){
				var isbn_13 = data.industryIdentifiers[1].identifier.substr(0,3)+'-'+data.industryIdentifiers[1].identifier.substr(3,10);
				$('#isbn_13').val(isbn_13);
			}
		} 
	
	});
}

function cleanLiterature(){
	$('#literature_load_status').text('').removeClass('empty').removeClass('success');
	$('#literature_select').hide();
	$('#literature_select_bt').hide();
	$('#literature_cancel_bt').hide();
}





