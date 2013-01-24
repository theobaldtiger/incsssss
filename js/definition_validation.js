$(document).ready( function(){

	// On submit, check the field inputs
	$('#definition_form').submit( checkValidation );

});

function checkValidation(){

	var valid = true;

	// Empty the status
	$('#validation_status').empty();

	// Empty string is invalid
	if($.trim($('#defined_word').val())==""){
		$('#validation_status').append($('<p>').addClass('validation').text("Please enter a non-empty word"));
		$('#defined_word').focus();
		valid=false;
	}

	// Empty summary also
	if($.trim($('#definition').val())==""){
		$('#validation_status').append($('<p>').addClass('validation').text("Please enter a non-empty definition"));
		$('#definition').focus();
		valid=false;
	}

	// Nothing went wrong?
	if(valid==true){
		return true;
	}
	else{
		return false;
	}

}