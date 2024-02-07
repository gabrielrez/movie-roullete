const movie = document.querySelector('.movie');
const btn = document.querySelector('.btn');
const movieImg = document.querySelector(".movie-img");
const about = document.querySelector(".about");

function fetchMovie() {
  const apiKey = "9441b010fb2bf7ea1349af61a258887b";

  return fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`)
    .then(response => response.json())
    .then(data => data.results)
    .catch(error => {
      console.error('Erro ao obter filmes:', error);
      throw error;
    });
}

function chooseMovie() {
  fetchMovie()
    .then(movies => {
      if (movies.length > 0) {
        const randomIndex = Math.floor(Math.random() * movies.length);
        const randomMovie = movies[randomIndex];
        movie.innerText = randomMovie.title;
        movieImg.src = `https://image.tmdb.org/t/p/w500${randomMovie.poster_path}`;
        if (!movieImg.classList.contains("active")) {
          movieImg.classList.add("active");
        }
        about.innerText = randomMovie.overview;
      } else {
        movie.innerText = "Algum erro ocorreu";
      }
    })
    .catch(() => {
      movie.innerText = 'Erro ao obter filmes.';
    });
}

btn.addEventListener("click", chooseMovie);