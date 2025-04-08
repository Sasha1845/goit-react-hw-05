"use client";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieCast } from "../../services/api";
import Loader from "../Loader/Loader";
import "./MovieCast.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w200";

  useEffect(() => {
    const fetchCast = async () => {
      try {
        setLoading(true);
        const castData = await getMovieCast(movieId);
        setCast(castData);
      } catch (error) {
        console.error("Error fetching cast:", error);
        setError("Не вдалося завантажити інформацію про акторський склад");
      } finally {
        setLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  if (loading) return <Loader />;
  if (error) return <div className="error-message">{error}</div>;
  if (cast.length === 0)
    return (
      <div className="no-cast">Інформація про акторський склад відсутня</div>
    );

  return (
    <div className="cast-section">
      <h2 className="section-title">Акторський склад</h2>
      <ul className="cast-list">
        {cast.map((actor) => (
          <li key={actor.id} className="cast-item">
            {actor.profile_path ? (
              <img
                src={`${IMAGE_BASE_URL}${actor.profile_path}`}
                alt={actor.name}
                className="cast-image"
              />
            ) : (
              <div className="no-image">No image</div>
            )}
            <div className="cast-info">
              <p className="actor-name">{actor.name}</p>
              <p className="character">{actor.character}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
