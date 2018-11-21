
var xhr = new XMLHttpRequest();

function createListOfMovies(resultMovie){

  var newMovieDetailsElement = document.createElement('div');
  newMovieDetailsElement.className = "movieDetails";

  var newMovieDetailsImg = document.createElement('img');
  newMovieDetailsImg.src = resultMovie.Poster;

  var newMovieDetailsTitle = document.createElement('h2');
  newMovieDetailsTitle.innerHTML = resultMovie.Title;

  var newMovieDetailsYear = document.createElement('p');
  newMovieDetailsYear.innerHTML = resultMovie.Year;

  var newMovieDetailsActor = document.createElement('p');
  newMovieDetailsActor.innerHTML = 'Actors: ' + resultMovie.Actors;

  var newMovieDetailsAwards = document.createElement('p');
  newMovieDetailsAwards.innerHTML = 'Awards: ' + resultMovie.Awards;

  var newMovieDetailsCountry = document.createElement('p');
  newMovieDetailsCountry.innerHTML = 'Country: ' + resultMovie.Country;

  var newMovieDetailsDirector = document.createElement('p');
  newMovieDetailsDirector.innerHTML = 'Director: ' + resultMovie.Director;

  var newMovieDetailsGenre = document.createElement('p');
  newMovieDetailsGenre.innerHTML = 'Genre: ' + resultMovie.Genre;

  var newMovieDetailsLanguage = document.createElement('p');
  newMovieDetailsLanguage.innerHTML = 'Language: ' + resultMovie.Language;

  var newMovieDetailsPlot = document.createElement('h3');
  newMovieDetailsPlot.innerHTML = resultMovie.Plot;

  newMovieDetailsElement.appendChild(newMovieDetailsImg);
  newMovieDetailsElement.appendChild(newMovieDetailsTitle);
  newMovieDetailsElement.appendChild(newMovieDetailsYear);
  newMovieDetailsElement.appendChild(newMovieDetailsActor);
  newMovieDetailsElement.appendChild(newMovieDetailsAwards);
  newMovieDetailsElement.appendChild(newMovieDetailsCountry);
  newMovieDetailsElement.appendChild(newMovieDetailsDirector);
  newMovieDetailsElement.appendChild(newMovieDetailsGenre);
  newMovieDetailsElement.appendChild(newMovieDetailsLanguage);
  newMovieDetailsElement.appendChild(newMovieDetailsPlot);

  document.getElementById('movieDetailsContainer').appendChild(newMovieDetailsElement);

}


xhr.onload = function () {


	if (xhr.status >= 200 && xhr.status < 300) {

    var resultDetailsMovie = JSON.parse(xhr.response);
		console.log('¡Llamada AJAX exitosa!', xhr);
    createListOfMovies(resultDetailsMovie);

	} else {

		console.log('Algo falló en la llamada... :(');

	}

};


var KEY = 'f12ba140';
var movies = '&s=star%20wars';

var urlString = window.location.href;
var url = new URL(urlString);
var id = url.searchParams.get("id");

xhr.open('GET', 'http://www.omdbapi.com/?apikey=' + KEY + '&i=' + id + '&plot=full');
xhr.send();
