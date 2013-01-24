$(document).ready( function(){
	
	// Check the authorization on page load
	checkAuthorization();

	// Ignore the click on the empty href
	$('a[href="#"]').live('click', function(e){ e.preventDefault(); });

});

function checkAuthorization(){
	// Remove possible login class
	$('footer #login_status').removeClass('login');

	// Check for authorization
	if(!localStorage.login_status){
		// If not authorized, hide the protected content
		$('.authorized').hide();
		// Update footer
		$('footer #login_status').text('login');
	}
	else{
		$('.authorized').show();
		// Update footer
		$('footer #login_status').text('logged in as "'+localStorage.login_name+'"').addClass('login');
	}
};