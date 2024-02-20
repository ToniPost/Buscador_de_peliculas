const apiKey = '6e47ae631f96f9fe7f19704ee55a6ed2';

document.addEventListener('DOMContentLoaded', function () {
  // Obtener el ID de la película de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get('id');

  // Verificar si hay un ID de película válido
  if (movieId) {
    getMovieDetails(movieId);
  } else {
    showError('Error: No se proporcionó un ID de película válido.');
  }
});

function getMovieDetails(movieId) {
  fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      displayMovieDetails(data);
    })
    .catch(error => {
      console.error('Error al obtener detalles de la película:', error);
      showError('Error al obtener detalles de la película.');
    });
}

function displayMovieDetails(movie) {
  const movieDetailsContainer = document.getElementById('movie-details');
  
  if (!movie) {
    showError('Error: No se pudo obtener información de la película.');
    return;
  }

  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const trailerKey = getTrailerKey(movie.videos?.results || []);
  const trailerUrl = trailerKey ? `https://www.youtube.com/watch?v=${trailerKey}` : 'No disponible';

  movieDetailsContainer.innerHTML = `
    <img src="${imageUrl}" alt="${movie.title}">
    <h2>${movie.title}</h2>
    <p><strong>Fecha de estreno:</strong> ${movie.release_date}</p>
    <p><strong>Puntuación:</strong> ${movie.vote_average}</p>
    <p><strong>Descripción:</strong> ${movie.overview}</p>
    <p><strong>Trailer:</strong> <a href="${trailerUrl}" target="_blank">Ver Trailer</a></p>
    <p><strong>Actores:</strong> ${getActors(movie.credits?.cast || [])}</p>
  `;
}

function getTrailerKey(videos) {
  const trailer = videos.find(video => video.type === 'Trailer');
  return trailer ? trailer.key : '';
}

function getActors(actors) {
  const actorNames = actors.slice(0, 5).map(actor => actor.name);
  return actorNames.join(', ');
}

function showError(message) {
  const movieDetailsContainer = document.getElementById('movie-details');
  movieDetailsContainer.innerHTML = `<p>${message}</p>`;
}
