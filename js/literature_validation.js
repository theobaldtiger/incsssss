$(document).ready( function(){

	// On submit, check the field inputs
	$('#literature_form').submit( checkValidation );

});

function checkValidation(){

	var valid = true;

	// Empty the status
	$('#validation_status').empty();
	
	// Empty string for title is invalid
	if($.trim($('#title').val())==""){
		$('#validation_status').append($('<p>').addClass('validation').text("Please enter a non-empty title"));
		$('#title').focus();
		valid=false;
	}

	// At least one type has to be selected
	if($('#type').val()==""){
		$('#validation_status').append($('<p>').addClass('validation').text("Please select a type"));
		$('#type').focus();
		valid=false;
	}

	// Empty summary also
	if($.trim($('#summary').val())==""){
		$('#validation_status').append($('<p>').addClass('validation').text("Please enter a non-empty summary"));
		$('#summary').focus();
		valid=false;
	}

	// Are the URLs valid?
	var img_url_regexp = /^http:\/\/.{0,300}(\.gif|\.jpg|\.png|\.jpeg|gbs_api)$/i;
	var url_regexp = /^http:\/\/.{0,300}$/i;

	if( $('#cover_url').val().length>0 && !(img_url_regexp.test($('#cover_url').val())) ) {
		$('#validation_status').append($('<p>').addClass('validation').text("Please enter a valid image url starting with http:// and ending with .jpg, .gif, .png or gbs_api"));
		$('#cover_url').focus();
		valid=false;
	}

	if( $('#url').val().length > 0 && !(url_regexp.test($('#url').val())) ) {
		$('#validation_status').append($('<p>').addClass('validation').text("Please enter a valid url starting with http://"));
		$('#url').focus();
		valid=false;
	}

	// Check for ISBN-10 and ISBN-13
	var isbn_10_regexp = /^\d{10}$/;
	var isbn_13_regexp = /^\d{3}-\d{10}$/;
	if($('#isbn_10').val().length>0 && !(isbn_10_regexp.test($('#isbn_10').val()))) {
		$('#validation_status').append($('<p>').addClass('validation').text("A valid ISBN-10 number has exactly ten digits"));
		$('#isbn_10').focus();
		valid=false;
	}

	if($('#isbn_13').val().length>0 && !(isbn_13_regexp.test($('#isbn_13').val()))) {
		$('#validation_status').append($('<p>').addClass('validation').text("A valid ISBN-13 number has the format ddd-dddddddddd"));
		$('#isbn_13').focus();
		valid=false;
	}

	// Check the date (basic check)
	var date_regexp = /^\d{4}-\d{2}-\d{2}$/;
	if($('#publication_date').val().length>0 && !(date_regexp.test($('#publication_date').val()))) {
		$('#validation_status').append($('<p>').addClass('validation').text("A valid date has the format YYYY-MM-DD"));
		$('#publication_date').focus();
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