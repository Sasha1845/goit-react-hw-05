import { Link } from "react-router-dom";
import "./NotFoundPage.css";

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-text">Сторінку не знайдено</p>
      <p className="not-found-description">
        Сторінка, яку ви шукаєте, не існує або була переміщена.
      </p>
      <Link to="/" className="home-link">
        Повернутися на головну
      </Link>
    </div>
  );
};

export default NotFoundPage;
