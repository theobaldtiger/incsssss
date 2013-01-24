// Get the id from the query string
var definition_id = location.search.replace('?','');

$(document).ready( function(){

	// Is the query string a number?
	if(!isNaN(definition_id)){
		// Make an AJAX-request to receive all the information associated with a definition
		$.getJSON('../php/get_definition.php', { id: definition_id }, showDefinition);
	}
	else{
		// Back to the index if NaN
		window.location.href = "definitions_index.html";
	}

});

// Update the DOM with the retrieved JSON-data about the definition
function showDefinition(data){

	$('#defined_word').val(data[0].defined_word);
	$('#definition').val(data[0].definition);
	// Also set the id as value as hidden input for further processing on the server side
	$('#definition_id').val(definition_id);

}