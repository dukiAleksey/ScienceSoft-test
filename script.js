
// Start wiith loading JSON file
// Call ShowMovies function

(function() {

	var xhr = new XMLHttpRequest();

	xhr.open('GET', 'movies.json', true);

	xhr.onreadystatechange = function() {
		if (xhr.readyState != 4) return;

		if (xhr.status != 200) {
			// обработать ошибку
			alert(xhr.status + ': ' + xhr.statusText);
		} else {
			try {
				var movies = JSON.parse(xhr.responseText);
			} catch (e) {
				alert("Некорректный ответ " + e.message);
			}
			showMovies(movies);
		}
	}
	xhr.send();
})();

// Show thumbnails
// get events

function showMovies(movies) {

	movies.forEach(function(movies) {
		var li = list.appendChild(document.createElement('li'));
		li.innerHTML = '<img src="' + movies.images.cover + '"><p>' + movies.title + '</p><p class="small">' + movies.meta.releaseYear + '</p>';
		li.setAttribute("id", movies.id);
	});

	var elems = document.getElementById('list');

	elems.onclick = function(event) {
		showPlayer(event.target.parentNode.getAttribute('id'), movies)
	}
}

// Show player with info	

function showPlayer(id,movies) {

	var id = id-1;

	// create video container with parameters

	var video = document.createElement('video');

	video.setAttribute('poster', movies[id].images.placeholder);
	video.setAttribute('controls', '');
	video.setAttribute('autoplay', '');

	for (var i = 0; i < movies[id].streams.length; i++) {

		var sourse = document.createElement('source');
		sourse.setAttribute('src', movies[id].streams[i].url);
		sourse.setAttribute('type', 'video/' + movies[id].streams[i].type);
		video.appendChild(sourse);

	}

	var textnode = document.createTextNode("Your browser does not support the video tag.");
	video.appendChild(textnode);

	document.getElementById('video').innerHTML = '';
	document.getElementById('video').appendChild(video);

	var title = document.createElement('h1');
	var year = document.createTextNode( ' (' + movies[id].meta.releaseYear + ')')
	var titleLabel = document.createTextNode(movies[id].title);
	title.appendChild(titleLabel);
	title.appendChild(year);

	document.getElementById('video').appendChild(title);

	//  Add Directors

	if (movies[id].meta.directors.length > 0) {

		var directors = document.createElement('p');
		directors.innerHTML = 'Directors: ';

		for (var i = 0; i < movies[id].meta.directors.length; i++) {
			var director = document.createTextNode(' ' + movies[id].meta.directors[i].name);
			directors.appendChild(director);
		}

		document.getElementById('video').appendChild(directors);

	}

	//  Add actors

	if (movies[id].meta.actors.length > 0) {

		var actors = document.createElement('p');
		actors.innerHTML = 'Actors: ';

		for (var i = 0; i < movies[id].meta.actors.length; i++) {
			var director = document.createTextNode(' ' + movies[id].meta.actors[i].name);
			actors.appendChild(director)
		}

		document.getElementById('video').appendChild(actors);
	}
};