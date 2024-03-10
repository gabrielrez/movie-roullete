const movieTitle = document.querySelector('.movie-title');
const movieDate = document.querySelector('.movie-date');
const btn = document.querySelector('.btn');
const movieImg = document.querySelector(".movie-img");
const about = document.querySelector(".about");
const movieContainer = document.querySelector(".movie-box");
const events = ["click", "touchstart"];

async function fetchMovie() {
  const apiPages = [1, 2, 3, 4, 5];
  const apiKey = "9441b010fb2bf7ea1349af61a258887b";
  const page = apiPages[Math.floor(Math.random() * apiPages.length)];

  try{
    const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=pt-BR&page=${page}`);
    const data = await response.json();
    return data.results;
  } catch(error) {
    console.log("Erro ao obter filmes: ", error);
    throw error;
  }
}

async function chooseMovie() {
  try{
    const movies = await fetchMovie();
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
      movieTitle.innerText = "Algum erro ocorreu";
    }
  } catch (error) {
    movieTitle.innerText = 'Erro ao obter filmes.';
  }
}

events.forEach((event) => {
  btn.addEventListener(event, chooseMovie);
})