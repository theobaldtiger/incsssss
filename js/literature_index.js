$(document).ready( function(){

	// Make an AJAX-request to retrieve all literature from the database depending on the type
	$.getJSON('../php/get_all_literature.php', updateLiteratureList);

	// Reset session storage references
	window.sessionStorage.clear();

	// React to type select
	$('#type_select').change( typeSelect );

	// At the beginning, directly run the type select
	typeSelect();

});

// Handle the JSON-response
function updateLiteratureList(data){



	// Iterate through the response and create a list item for each literature with a link to it

	for(var i=0;i<data.length;i++){
		$('<li>').append(
			$('<a>')
			.attr('href','show_literature.html?'+data[i].id)
			.text(data[i].title)
			)
			.attr('data-type',data[i].type)
			.appendTo($('#literature_list'));
	}

}

function typeSelect(){
	// Get the selected type
	var type = $('#type_select option:selected').val();
	// Show/hide the selected/deselected types
	switch(type){
		case 'all':
			$('#literature_list li').show();
			break;
		case 'books':
			$('#literature_list li[data-type="book"]').show();
			$('#literature_list li:not([data-type="book"])').hide();
			break;
		case 'magazine_articles':
			$('#literature_list li[data-type="magazine_article"]').show();
			$('#literature_list li:not([data-type="magazine_article"])').hide();
			break;
		case 'newspaper_articles':
			$('#literature_list li[data-type="newspaper_article"]').show();
			$('#literature_list li:not([data-type="newspaper_article"])').hide();
			break;
		case 'scientific_articles':
			$('#literature_list li[data-type="scientific_article"]').show();
			$('#literature_list li:not([data-type="scientific_article"])').hide();
			break;
		case 'blogposts':
			$('#literature_list li[data-type="blog_post"]').show();
			$('#literature_list li:not([data-type="blog_post"])').hide();
			break;


	}



}