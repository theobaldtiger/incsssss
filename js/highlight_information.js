$(document).ready( function(){

	// Activate tooltipping
	$( this ).tooltip( {position: {my: "left+2 top+5", at: "left bottom", collision: "flipfit" }} );

	// Load from local storage
	localStorage.search_input ? $('#information_input').html(localStorage.search_input) : $('#information_input').html('');

	// Reset file inpu
	$('#file_input').val('');

	// Handle a file upload
	$('#file_input').change( loadTextfile );

	// Turn editing on and of
	$('#toggle_edit_bt').toggle( 
		
		function(){
			$('#information_input').attr('contenteditable','false');
			// Store the html in local storage
			localStorage.search_input = $('#information_input').html();
			// Create tooltips
			getTooltips();
			// Remove a possible file link
			$('#file_input').val('');
			// Update the button text
			$(this).text('Edit');
		},
		function(){
			$('#information_input').attr('contenteditable','true');
			// Load from local storage
			localStorage.search_input ? $('#information_input').html(localStorage.search_input) : $('#information_input').html('');
			$(this).text('Save');
		}
	)


});

function loadTextfile(e){
	// Content editable = false => toggle
	if($('#information_input').attr('contenteditable')=="false"){
		$('#toggle_edit_bt').click();
	}

	// Assign to variable
	var file = e.target.files[0];

	// Check MIME-type
	if(file.type=="text/plain"){

		// Initiate the file reader
		var reader = new FileReader();

		// Bind to onload event 
		reader.onload = function(e){

			// Update DOM
			$('#information_input').text(e.target.result);
		}

		// Read file
		reader.readAsText(file);
	}

	else{
		alert("Only MIME-type 'text/plain' is accepted. You provided '"+file.type+"'.");
		$('#file_input').val('');
	}

}

function getTooltips (){

	// Get the input text
	var text = cleanHTML();
	//$('#information_input').html();

	// Is there any text?
	if($.trim(text).length!==0){
		// Get all existing definitions
		$.getJSON('../php/get_definitions.php', function(data){
			var definitions = data;
			// For each definition: Store all the indices in an array
			var definitions_indices = [];

			// Check for each definition whether it is present in the text
			for(var i=0; i<definitions.length;i++){
				// Get all start indices for the current definition
				var defined_word = $.trim(definitions[i].defined_word);
				var matched_indices = getMatchedIndices(defined_word, text);
				definitions_indices.push([defined_word, definitions[i].definition, matched_indices]);

				// How long is the defined term
				var def_term_length = defined_word.length;
			}

			// Were there any definitions that could be found?
			if(definitions_indices.length>0){
				// Use offset intervals, because the index shifts when the updated spans get inserted
				var offsets = [];

				// Iterate through each of them and update the text
				for(var j=0;j<definitions_indices.length;j++){
					var def_term = definitions_indices[j][0];
					var definition = definitions_indices[j][1];
					var matched_indices = definitions_indices[j][2];
					
					// Was the term found?
					if(matched_indices.length>0){
						// Wrap all occurences in a tooltip-span
						for(var k=0;k<matched_indices.length;k++){
							var offset = 0;
							// determine the offset for the current index
							for (var key in offsets){
								// The index needs to be shifted for each element which was inserted before
								if(matched_indices[k]>key){
									offset+=offsets[key];
								}
							}

							var span_def_term = '<span '+ 
								'title="'+definition+'">'+
								text.substring(matched_indices[k]+offset,matched_indices[k]+offset+def_term.length)+'</span>';
							
							// Update the old text string
							text = text.replaceAt(matched_indices[k]+offset,def_term.length,span_def_term);

							// Set the offset accordingly
							var required_offset = (span_def_term.length-def_term.length);
							// Add the own offset to the array
							offsets[matched_indices[k]] = required_offset;
						}
					}

				}
			}

			$('#information_input').html(text);
		});

		
	}
}

// Get the indices of all matched definition terms

function getMatchedIndices(def_term, text) {
    var def_term_length = def_term.length;
    var start_index = 0;
    var index = 0;
    var indices = [];
    // Convert both strings to lower-case
    var def_term = def_term.toLowerCase();
    var text = text.toLowerCase();

    // Get all occurences of a term and collect their indices
    while ((index = text.indexOf(def_term, start_index)) > -1) {
        indices.push(index);
        // Update the index in the next run
        start_index = index + def_term_length;
    }
    return indices;
}

// Replace a string at a previously defined position

String.prototype.replaceAt=function(index, old_def_term_length, def_term) {
    return this.substr(0, index) + def_term + this.substr(index+old_def_term_length);
}

function cleanHTML(){
	// Remove all images and replace links with their anchor texts
	$('#information_input').remove('img');
	$('#information_input a').replaceWith( function(){ return $(this).html() });
	return $('#information_input').html();

}

