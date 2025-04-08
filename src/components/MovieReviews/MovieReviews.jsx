"use client";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../services/api";
import Loader from "../Loader/Loader";
import "./MovieReviews.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const reviewsData = await getMovieReviews(movieId);
        setReviews(reviewsData);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setError("Не вдалося завантажити огляди");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  if (loading) return <Loader />;
  if (error) return <div className="error-message">{error}</div>;
  if (reviews.length === 0)
    return <div className="no-reviews">Огляди відсутні</div>;

  return (
    <div className="reviews-section">
      <h2 className="section-title">Огляди</h2>
      <ul className="reviews-list">
        {reviews.map((review) => (
          <li key={review.id} className="review-item">
            <div className="review-header">
              <div className="author-info">
                {review.author_details.avatar_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w100${review.author_details.avatar_path}`}
                    alt={review.author}
                    className="author-avatar"
                  />
                ) : (
                  <div className="avatar-placeholder">
                    {review.author.charAt(0)}
                  </div>
                )}
                <div>
                  <h3 className="author-name">{review.author}</h3>
                  <p className="review-date">
                    {new Date(review.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              {review.author_details.rating && (
                <div className="author-rating">
                  <span className="rating-value">
                    {review.author_details.rating}
                  </span>
                  <span className="rating-max">/10</span>
                </div>
              )}
            </div>
            <div className="review-content">
              <p>
                {review.content.length > 500
                  ? `${review.content.substring(0, 500)}...`
                  : review.content}
              </p>
              {review.content.length > 500 && (
                <a
                  href={review.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="read-more"
                >
                  Читати повністю
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
