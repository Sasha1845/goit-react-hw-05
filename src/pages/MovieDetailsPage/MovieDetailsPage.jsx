"use client";

import { useState, useEffect } from "react";
import { useParams, useLocation, Link, Outlet } from "react-router-dom";
import { toast } from "react-hot-toast";
import { getMovieDetails } from "../../services/api";
import Loader from "../../components/Loader/Loader";
import "./MovieDetailsPage.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkHref = location.state?.from || "/movies";

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const movieData = await getMovieDetails(movieId);
        setMovie(movieData);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setError("Не вдалося завантажити інформацію про фільм");
        toast.error("Помилка при завантаженні інформації про фільм");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) return <Loader />;
  if (error) return <div className="error-message">{error}</div>;
  if (!movie) return <div className="error-message">Фільм не знайдено</div>;

  const {
    title,
    original_title,
    poster_path,
    release_date,
    vote_average,
    vote_count,
    runtime,
    genres,
    overview,
    tagline,
    production_countries,
    budget,
    revenue,
  } = movie;

  return (
    <main className="movie-details-page">
      <Link to={backLinkHref} className="back-button">
        ← Назад
      </Link>

      <div className="movie-details">
        <div className="movie-poster-container">
          {poster_path ? (
            <img
              src={`${IMAGE_BASE_URL}${poster_path}`}
              alt={title}
              className="movie-poster"
            />
          ) : (
            <div className="no-poster">Постер відсутній</div>
          )}
        </div>

        <div className="movie-info">
          <h1 className="movie-title">
            {title}{" "}
            {release_date && `(${new Date(release_date).getFullYear()})`}
          </h1>

          {original_title !== title && (
            <p className="original-title">{original_title}</p>
          )}

          {tagline && <p className="tagline">"{tagline}"</p>}

          <div className="movie-meta">
            <div className="rating">
              <span className={`rating-value ${getRatingClass(vote_average)}`}>
                {vote_average ? vote_average.toFixed(1) : "N/A"}
              </span>
              <span className="votes-count">({vote_count} голосів)</span>
            </div>

            {release_date && (
              <div className="release-date">
                <span className="meta-label">Дата виходу:</span>
                <span>{new Date(release_date).toLocaleDateString()}</span>
              </div>
            )}

            {runtime && (
              <div className="runtime">
                <span className="meta-label">Тривалість:</span>
                <span>{formatRuntime(runtime)}</span>
              </div>
            )}
          </div>

          {genres && genres.length > 0 && (
            <div className="genres">
              <span className="meta-label">Жанри:</span>
              <div className="genres-list">
                {genres.map((genre) => (
                  <span key={genre.id} className="genre">
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {overview && (
            <div className="overview">
              <h2 className="section-title">Опис</h2>
              <p>{overview}</p>
            </div>
          )}

          <div className="additional-info">
            {production_countries && production_countries.length > 0 && (
              <div className="countries">
                <span className="meta-label">Країна:</span>
                <span>
                  {production_countries
                    .map((country) => country.name)
                    .join(", ")}
                </span>
              </div>
            )}

            {budget > 0 && (
              <div className="budget">
                <span className="meta-label">Бюджет:</span>
                <span>{formatMoney(budget)}</span>
              </div>
            )}

            {revenue > 0 && (
              <div className="revenue">
                <span className="meta-label">Збори:</span>
                <span>{formatMoney(revenue)}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="movie-navigation">
        <h2 className="section-title">Додаткова інформація</h2>
        <ul className="nav-links">
          <li>
            <Link to="cast" state={{ from: backLinkHref }} className="nav-link">
              Акторський склад
            </Link>
          </li>
          <li>
            <Link
              to="reviews"
              state={{ from: backLinkHref }}
              className="nav-link"
            >
              Огляди
            </Link>
          </li>
        </ul>
      </div>

      <Outlet />
    </main>
  );
};

// Helper functions
const getRatingClass = (rating) => {
  if (rating >= 7) return "high";
  if (rating >= 5) return "medium";
  return "low";
};

const formatRuntime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}год ${mins}хв`;
};

const formatMoney = (amount) => {
  return new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
};

export default MovieDetailsPage;
