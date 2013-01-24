// Get the id from the query string
var definition_id = location.search.replace('?','');

$(document).ready( function(){

	// Is the query string a number?
	if(!isNaN(definition_id)){
		// Make AJAX-requests to receive all the definition information
		$.getJSON('../php/get_definition.php', { id: definition_id }, showDefinition);
	}
	else{
		// Back to the index if NaN
		window.location.href = "../html/definitions_index.html";
	}

});

// Update the DOM with the retrieved JSON-data about the definition
function showDefinition(data){

	$('#defined_word').text(data[0].defined_word);
	$('#definition').text(data[0].definition);

	// Update the link for the edit and delete button
	$('#edit_definition_link').attr('href','edit_definition.html?'+definition_id);
	$('#delete_definition_link').attr('href','../php/delete_definition.php?id='+definition_id);
	

}