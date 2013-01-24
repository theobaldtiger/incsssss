$(document).ready( function(){

	// On submit, check the field inputs
	$('#topic_form').submit( checkValidation );

});

function checkValidation(){

	var valid = true;

	// Empty the status
	$('#validation_status').empty();

	// Empty string is invalid
	if($.trim($('#title').val())==""){
		$('#validation_status').append($('<p>').addClass('validation').text("Please enter a non-empty title"));
		$('#title').focus();
		valid=false;
	}

	// Empty summary also
	if($.trim($('#summary').val())==""){
		$('#validation_status').append($('<p>').addClass('validation').text("Please enter a non-empty summary"));
		$('#summary').focus();
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