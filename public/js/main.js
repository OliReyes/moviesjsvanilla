window.onload = function(){

  var logged = JSON.parse(sessionStorage.getItem('logged'));
  var content = document.getElementById('content');
  var login = document.getElementById('login');
  var loginButton = document.getElementById('loginButton');


  if(logged == true){

    content.style.display = 'block';
    login.style.display = 'none';

    loadAllMoviesLogic();

  } else {

    content.style.display = 'none';
    login.style.display = 'block';

    loginButton.addEventListener('click', function (event) {

      var user = document.getElementById('user').value;
      var pass = document.getElementById('pass').value;

      if ( user === 'user' && pass == 1234 ) {

        sessionStorage.setItem('logged', 'true');

        alert('¡Inicio de sesión correcto!');

        content.style.display = 'block';
        login.style.display = 'none';

        loadAllMoviesLogic();

      } else {

        alert('¡Credenciales incorrectas!');

      }

    }, false);

  }


  function loadAllMoviesLogic(){

    var xhr = new XMLHttpRequest();

    var getClosest = function (elem, selector) {

    	// Element.matches() polyfill
    	if (!Element.prototype.matches) {
    	    Element.prototype.matches =
    	        Element.prototype.matchesSelector ||
    	        Element.prototype.mozMatchesSelector ||
    	        Element.prototype.msMatchesSelector ||
    	        Element.prototype.oMatchesSelector ||
    	        Element.prototype.webkitMatchesSelector ||
    	        function(s) {
    	            var matches = (this.document || this.ownerDocument).querySelectorAll(s),
    	                i = matches.length;
    	            while (--i >= 0 && matches.item(i) !== this) {}
    	            return i > -1;
    	        };
    	}

    	// Get the closest matching element
    	for ( ; elem && elem !== document; elem = elem.parentNode ) {
    		if ( elem.matches( selector ) ) return elem;
    	}
    	return null;

    };

    function createListOfMovies(resultMovies){

      var detailViewUrl = '/detalle?id=';

      for (var movie in resultMovies) {
          var newMovieListElement = document.createElement('li');
          newMovieListElement.className = "movie";
          newMovieListElement.id = resultMovies[movie].imdbID;

          var newMovieAnchor = document.createElement('a');
          newMovieAnchor.href = detailViewUrl + resultMovies[movie].imdbID;
          var newMovieImg = document.createElement('img');
          newMovieImg.src = resultMovies[movie].Poster;
          newMovieAnchor.appendChild(newMovieImg);

          var newMovieAnchor2 = document.createElement('a');
          newMovieAnchor2.href = detailViewUrl + resultMovies[movie].imdbID;
          var newMovieTitle = document.createElement('h2');
          newMovieTitle.innerHTML = resultMovies[movie].Title;
          newMovieAnchor2.appendChild(newMovieTitle);

          var newMovieYear = document.createElement('small');
          newMovieYear.innerHTML = resultMovies[movie].Year;

          var newMovieFavButton = document.createElement('button');
          newMovieFavButton.className = 'favButton';
          newMovieFavButton.innerHTML = 'Añadir como favorita';

          newMovieListElement.appendChild(newMovieAnchor);
          newMovieListElement.appendChild(newMovieAnchor2);
          newMovieListElement.appendChild(newMovieYear);
          newMovieListElement.appendChild(newMovieFavButton);


          newMovieFavButton.addEventListener('click', function (event) {

          	// If the clicked item is an `.accordion-toggle` get the parent `.accordion`
          	if ( event.target.classList.contains('favButton') ) {

          		// Get the parent with the `.accordion` class
          		var parent = getClosest(event.target, '.movie');

              checkIfInFav(parent.id, event.target);

          	}

          }, false);

          document.getElementById('moviesList').appendChild(newMovieListElement);

      }

    }


    xhr.onload = function () {


    	if (xhr.status >= 200 && xhr.status < 300) {

        var resultMovies = JSON.parse(xhr.response).Search;
    		console.log('¡Llamada AJAX exitosa!', xhr);
        createListOfMovies(resultMovies);
    	} else {

    		console.log('Algo falló en la llamada... :(');
    	}

    };


    var KEY = 'f12ba140';
    var movies = '&s=star%20wars';

    xhr.open('GET', 'http://www.omdbapi.com/?apikey=' + KEY + movies);
    xhr.send();


    function checkIfInFav(movieID, favButton){

      var oldMovies = JSON.parse(localStorage.getItem('favMovies')) || [];

      if( oldMovies.includes(movieID) ){
        removeFromFav(movieID);
        favButton.innerHTML = 'Añadir como favorita';
      }
      else{
        addToFav(movieID);
        favButton.innerHTML = 'Añadida';
      }

    }

    function addToFav(movieID){

      var oldMovies = JSON.parse(localStorage.getItem('favMovies')) || [];

      oldMovies.push(movieID);

      localStorage.setItem('favMovies', JSON.stringify(oldMovies));

    }

    function removeFromFav(movieID){

      var oldMovies = JSON.parse(localStorage.getItem('favMovies')) || [];

      var index = oldMovies.indexOf(movieID);
      if (index > -1) {
        oldMovies.splice(index, 1);
      }

      localStorage.setItem('favMovies', JSON.stringify(oldMovies));

    }

  }


}
