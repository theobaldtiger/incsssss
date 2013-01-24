$(document).ready( function(){

	// Initially, check if there is an existing login
	checkLogin();

	// Handle the submit case
	$('#login_form').submit( function(){

		initiateLogin();
		return false;
	});

	// Logout
	$('#logout_bt').click( function(){
		// Clear local storage
		localStorage.clear();

		// Update DOM
		checkLogin();
		// Defined in index.js
		checkAuthorization();
	})

});

function initiateLogin(){

	// Make the HTTP post request
	$.post("../php/login.php", $('#login_form').serialize(), handleLoginState);
}

function handleLoginState(dt){
	var data = $.parseJSON(dt);
	// Udpate the login status
	if(data.error){
		$('#login_status_msg').text(data.error).removeClass('success').addClass('empty');
		checkAuthorization();
	}
	else if (data.success){
		// Set the login state in local storage
		localStorage.login_status = 'success';
		localStorage.login_name = data.success;

		$('#login_status_msg').text('You are logged in as "'+data.success+'"').removeClass('empty').addClass('success');
		$('#logout_bt').show();
		$('#login_form').hide();
		checkAuthorization();

	}
	
}

function checkLogin(){

	// Remove all existing classes and hide the input elements
	$('#login_status_msg').text('').removeClass('empty').removeClass('success');
	$('#login_form').hide();
	$('#logout_bt').hide();


	// Existing login
	if(localStorage.login_status){
		checkAuthorization();
		$('#login_status_msg').text('You are logged in as "'+localStorage.login_name+'"').addClass('success');
		$('#login_form').hide();
		$('#logout_bt').show();
	}
	else{
		$('#login_form').show();
		$('#logout_bt').hide();
	}
}