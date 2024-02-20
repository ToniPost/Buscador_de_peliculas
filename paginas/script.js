const apiKey = '6e47ae631f96f9fe7f19704ee55a6ed2';

document.addEventListener('DOMContentLoaded', function () {
  getRandomMovies();
});

function getRandomMovies() {
  fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc`)
    .then(response => response.json())
    .then(data => {
      displayMovies(data.results);
    })
    .catch(error => console.error('Error al obtener películas al azar:', error));
}

function searchMovies() {
  const searchInput = document.getElementById('search-input');
  const query = searchInput.value;

  fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`)
    .then(response => response.json())
    .then(data => {
      displayMovies(data.results);
    })
    .catch(error => console.error('Error al buscar películas:', error));
}

function displayMovies(movies) {
  const movieList = document.getElementById('movie-list');
  movieList.innerHTML = '';

  movies.forEach(movie => {
    const listItem = document.createElement('li');
    const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    listItem.innerHTML = `
      <img src="${imageUrl}" alt="${movie.title}">
      <strong>${movie.title}</strong> (Año: ${movie.release_date.split('-')[0]})
      <button onclick="showMovieDetails(${movie.id})">Ver Detalles</button>
    `;

    movieList.appendChild(listItem);
  });
}

function showMovieDetails(movieId) {
  // Redirigir a la página de detalles con el ID de la película como parámetro
  window.location.href = `details.html?id=${movieId}`;
}


