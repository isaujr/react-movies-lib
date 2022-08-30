import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

import "./styles.css"

const imageUrl = import.meta.env.VITE_IMG;

 const MovieCard = (props) => {
  return (
    <div className="movie-card" >
      <img src={imageUrl + props.movie_poster_path} alt={props.movie_title} />
      <h2>{props.movie_title}</h2>
      <p>
        <FaStar /> {props.movie_vote_average}
      </p>
      <Link to={`/movie/${props.movie_id}`}>Detalhes</Link>
    </div>
  )
}

export default MovieCard;