$(document).ready( function(){

	// Make an AJAX-request to retrieve all definitions from the database
	$.getJSON('../php/get_definitions.php', updateDefinitionList);

});

// Handle the JSON-response
function updateDefinitionList(data){

	// Iterate through the response and create a list item for each definition with a link to it

	
	for(var i=0;i<data.length;i++){
		$('<li>').append(
			$('<a>')
			.attr('href','show_definition.html?'+data[i].id)
			.text(data[i].defined_word)
			)
			.appendTo($('#definition_list'));
	}
}