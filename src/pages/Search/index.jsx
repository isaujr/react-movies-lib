import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";
import MovieCard from "../../components/MovieCard";

const searchUrl = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

const Search = () => {
  const [searchParams] = useSearchParams();

  const [movies, setMovies] = useState([]);
  const query = searchParams.get('q');

  const getSearchedMovies = async (url) => {
    try {
      const res = await fetch(url)
      const data = await res.json();
      setMovies(data.results);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const searchWithQueryUrl = `${searchUrl}?${apiKey}&query=${query}`;

    getSearchedMovies(searchWithQueryUrl);
  }, [query]);


  return <div className="container">
    <h2 className="title">Resultados de: <span className="query-text">{query}</span></h2>
    <div className="movies-container">
      {movies.length === 0 && <p>Carregando...</p>}
      {movies.map((movie) =>
        <MovieCard
          key={movie.id}
          movie_id={movie.id}
          movie_poster_path={movie.poster_path}
          movie_title={movie.title}
          movie_vote_average={movie.vote_average}

        />)}
    </div>
  </div>
}

export default Search