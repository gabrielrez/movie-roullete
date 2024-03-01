const movieTitle = document.querySelector('.movie-title');
const movieDate = document.querySelector('.movie-date');
const btn = document.querySelector('.btn');
const movieImg = document.querySelector(".movie-img");
const about = document.querySelector(".about");
const movieContainer = document.querySelector(".movie-box");
const events = ["click", "touchstart"];
// const tags = document.querySelectorAll(".tag");

function fetchMovie() {
  const apiPages = [1, 2, 3, 4, 5];
  const apiKey = "9441b010fb2bf7ea1349af61a258887b";
  const page = apiPages[Math.floor(Math.random() * apiPages.length)];

  return fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=pt-BR&page=${page}`)
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
        movieTitle.innerText = randomMovie.title;
        movieDate.innerText = randomMovie.release_date;
        movieImg.src = `https://image.tmdb.org/t/p/w500${randomMovie.poster_path}`;
        if (!movieImg.classList.contains("active")) {
          movieImg.classList.add("active");
        }
        about.innerText = randomMovie.overview;

        movieContainer.classList.add("scale-up");
        setTimeout(() => {
          movieContainer.classList.remove("scale-up");
        }, 300);
      } else {
        movies.innerText = "Algum erro ocorreu";
      }
    })
    .catch(() => {
      movie.innerText = 'Erro ao obter filmes.';
    });
}


events.forEach((event) => {
  btn.addEventListener(event, chooseMovie);
})

// tags.forEach((tag) => {
//   tag.addEventListener("click", function () {
//     this.classList.toggle("active");
//   })
// })