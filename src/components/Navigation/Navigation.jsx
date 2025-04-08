import { NavLink } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {
  return (
    <header className="header">
      <div className="logo">
        <span className="logo-text">Кінопошук</span>
      </div>
      <nav className="nav">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Головна
        </NavLink>
        <NavLink
          to="/movies"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Пошук фільмів
        </NavLink>
      </nav>
    </header>
  );
};

export default Navigation;
