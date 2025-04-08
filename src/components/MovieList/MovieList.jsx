import { Link, useLocation } from "react-router-dom";
import "./MovieList.css";

const MovieList = ({ movies }) => {
  const location = useLocation();
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  return (
    <ul className="movie-list">
      {movies.map((movie) => (
        <li key={movie.id} className="movie-item">
          <Link
            to={`/movies/${movie.id}`}
            state={{ from: location }}
            className="movie-link"
          >
            <div className="movie-poster">
              {movie.poster_path ? (
                <img
                  src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-image"
                />
              ) : (
                <div className="no-image">No image available</div>
              )}
            </div>
            <div className="movie-info">
              <h3 className="movie-title">{movie.title}</h3>
              <p className="movie-year">
                {movie.release_date
                  ? new Date(movie.release_date).getFullYear()
                  : "N/A"}
              </p>
              <div className="movie-rating">
                <span
                  className={`rating ${getRatingClass(movie.vote_average)}`}
                >
                  {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
                </span>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

// Helper function to determine rating class
const getRatingClass = (rating) => {
  if (rating >= 7) return "high";
  if (rating >= 5) return "medium";
  return "low";
};

export default MovieList;
