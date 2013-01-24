$(document).ready( function(){

	// On submit, check the field inputs
	$('#video_form').submit( checkValidation );

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

	// Empty summary also
	if($.trim($('#summary_long').val())==""){
		$('#validation_status').append($('<p>').addClass('validation').text("Please enter a non-empty summary"));
		$('#summary_long').focus();
		valid=false;
	}

	// Are the URLs valid?
	var img_url_regexp = /^http:\/\/.{0,100}(\.gif|\.jpg|\.png|\.jpeg)/i;
	var url_regexp = /http:\/\/.{0,100}/i;

	if( $('#cover_url').val().length>0 && !(img_url_regexp.test($('#cover_url').val())) ) {
		$('#validation_status').append($('<p>').addClass('validation').text("Please enter a valid image url starting with http:// and ending with .jpg, .gif or .png"));
		$('#cover_url').focus();
		valid=false;
	}

	if( $('#url').val().length > 0 && !(url_regexp.test($('#url').val())) ) {
		$('#validation_status').append($('<p>').addClass('validation').text("Please enter a valid url starting with http://"));
		$('#url').focus();
		valid=false;
	}

	// Has a valid year been entered?
	var year_regexp = /^\d{4}$/;

	if( $('#year').val().length>0 && !(year_regexp.test($('#year').val()))) {

		$('#validation_status').append($('<p>').addClass('validation').text("Please enter a valid year according to the format: YYYY"));
		$('#year').focus();
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