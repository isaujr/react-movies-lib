import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import {
  BsGraphUp,
  BsWallet2,
  BsHourglassSplit,
  BsFillFileEarmarkTextFill
} from 'react-icons/bs';

import "./styles.css"
import MovieCard from "../../components/MovieCard";

const moviesUrl = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const getMovies = async (url) => {
    try {
      const res = await fetch(url)
      const data = await res.json();
      setMovie(data);
    } catch (error) {
      console.error(error);
    }
  }

  const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    })
  }

  useEffect(() => {
    const movieUrl = `${moviesUrl}${id}?${apiKey}`;
    getMovies(movieUrl);
  }, [])

  return <div className="movie-page">
    {movie &&
      <>
        <MovieCard
          key={movie.id}
          movie_id={movie.id}
          movie_poster_path={movie.poster_path}
          movie_title={movie.title}
          movie_vote_average={movie.vote_average}
        />
        <p className="tagline">{movie.tagline}</p>

        <div className="info">
          <h3>
            <BsWallet2 /> Budget
          </h3>
          <p>{formatCurrency(movie.budget)}</p>
        </div>
        
        <div className="info">
          <h3>
            <BsGraphUp /> Revenue
          </h3>
          <p>{formatCurrency(movie.revenue)}</p>
        </div>

        <div className="info">
          <h3>
            <BsHourglassSplit /> Duration:
          </h3>
          <p>{movie.runtime} minutos</p>
        </div>

        <div className="info description">
          <h3>
            <BsFillFileEarmarkTextFill /> Description
          </h3>
          <p>{movie.overview}</p>
        </div>

      </>
    }
  </div>
}

export default Movie