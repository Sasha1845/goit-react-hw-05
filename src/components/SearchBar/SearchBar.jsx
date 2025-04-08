"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import "./SearchBar.css";

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query.trim() === "") {
      toast.error("Please enter a search term");
      return;
    }

    onSubmit(query);
  };

  return (
    <header className="search-bar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
