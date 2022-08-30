import { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard";

import "./styles.css";

const moviesUrl = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Home = () => {
  const [topMovies, setTopMovies] = useState([]);

  const getTopRatedMovies = async (url) => {
    try {
      const res = await fetch(url)
      const data = await res.json();
      setTopMovies(data.results);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const topRatedUrl = `${moviesUrl}top_rated?${apiKey}`;

    getTopRatedMovies(topRatedUrl);
  }, []);

  return (
    <div className="container">
      <h2 className="title">Melhores Filmes:</h2>
      <div className="movies-container">
        {topMovies.length === 0 && <p>Carregando...</p>}
        {topMovies.map((movie) =>
          <MovieCard
            key={movie.id}
            movie_id={movie.id}
            movie_poster_path={movie.poster_path}
            movie_title={movie.title}
            movie_vote_average={movie.vote_average}

          />)}
      </div>
    </div>
  );
}

export default Home