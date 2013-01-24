$(document).ready( function(){

	// Hide the movie select wrapper
	$('#movie_select_wrapper').hide();

	// Search button is clicked -> Get initial movie list from Rotten Tomatoes
	$('#search_bt').click( searchOnline );

	// Movie is selected -> Get data from Rotten Tomatoes
	$('#movie_select_bt').click( function(){
		getRTMovieData();
		$('#video_load_status').text('').removeClass('empty').removeClass('success')
		$('#movie_select_wrapper').hide();
	});

	// Cancel button is clicked
	$('#movie_cancel_bt').click( function(){
		$('#video_load_status').text('').removeClass('empty').removeClass('success')
		$('#movie_select').empty();
		$('#movie_select_wrapper').hide();
	});


});

function searchOnline(){
	// Get the title from the input
	var title = $('#title').val();

	// Check length
	if(title.length>0){
		$('#movie_select').empty();
		getMovieList(title);
	}
}

// Get a list of matching movies from Rotten Tomatoes
function getMovieList(query){

	// Clean the video inputs
	cleanVideo();

	var api_key = 'p6ep7yjjfg59jasuvg2cyqdn';
	var search_url = 'http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey='+api_key+'&callback=?'+'&q='+query+'&_prettyprint=true';	
	
	// Make the JSON-request
	$.getJSON(search_url, function(data){

		var nr_movies_found = data.total;
		$('#movie_load_status').text(nr_movies_found+' result(s) found');

		// # of found movies > 0?
		if(nr_movies_found >0){
			$('#movie_load_status').addClass('success');
			var movies = data.movies;
			// Sort the movies by year
			movies.sort( function(a,b){
				return b.year-a.year;
			})

			// Create an option for each movie found
			for(var i=0;i<movies.length;i++){
				$('<option>')
					.val(movies[i].id)
					.text(movies[i].title+' ('+movies[i].year+')')
					.appendTo($('#movie_select'));
			}

			$('#movie_select_wrapper').show();
			$('#movie_select').show();
			$('#movie_select_bt').show();
			$('#movie_cancel_bt').show();
		}
		else{
			$('#movie_select_wrapper').show();
			$('#movie_load_status').addClass('empty');
			$('#movie_select').hide();
			$('#movie_select_bt').hide();
			$('#movie_cancel_bt').hide();
		}
	});
}

// Get movie data from Rotten Tomatoes
function getRTMovieData(){
	// What is the id of the selected movie?
	var movie_id = $('#movie_select option:selected').val();
	var api_key = 'p6ep7yjjfg59jasuvg2cyqdn';
	var movie_url = 'http://api.rottentomatoes.com/api/public/v1.0/movies/'+movie_id+'.json?apikey='+api_key+'&callback=?&_prettyprint=true';	
	
	// Any missing data?
	var missing_data = [];

	//Make the request for a specific movie
	$.getJSON(movie_url,function(data){
		// Update the DOM
		$('#title').val(data.title);

		// If data is missing, an identifier for OMDB is added to the array
		data.posters.detailed !== "" ? $('#cover_url').val(data.posters.detailed) : missing_data.push('poster');
		data.year !== "" ? $('#year').val(data.year) : missing_data.push('year');
		data.runtime !== "" ? $('#length').val(data.runtime) : missing_data.push('runtime');
		data.abridged_directors[0].name !=="" ? $('#director').val(data.abridged_directors[0].name) : missing_data.push('director');
		data.synopsis !== "" ? $('#summary_long').val(data.synopsis) : missing_data.push('plot');

		// Make a call to OMDB when any missing data is present
		if(missing_data.length>0){
			getOMDBMovieData(data.title, missing_data);
		}
	});
}

// Get movie data from OMDB
function getOMDBMovieData(title, req_data){
	var missing_data = req_data;

	var url = 'http://www.omdbapi.com/?t='+title+'&plot=full&callback=?';
		url = encodeURI(url);
		$.getJSON(url,function(data){
			// check if we got a valid response
			if(data.Response=='True'){
				// iterate through the missing fields and get the data if necessary
				for(var i=0;i < missing_data.length;i++){
					switch(missing_data[i]){
						case "poster":
							$('#cover_url').val(data.Poster);
							break;
						case "year":
							$('#year').val(data.Year);
							break;
						case "runtime":
							$('#length').val(data.Runtime);
							break;
						case "director":
							$('#director').val(data.Director);
							break;
						case "plot":
							$('#summary_long').val(data.Plot);
							break;
					}
				}
			}
		});
}

function cleanVideo(){
	$('#movie_load_status').text('').removeClass('empty').removeClass('success');
	$('#movie_select').hide();
	$('#movie_select_bt').hide();
	$('#movie_cancel_bt').hide();
}
