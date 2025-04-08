"use client";

import "./LoadMoreBtn.css";

const LoadMoreBtn = ({ onClick }) => {
  return (
    <div className="load-more-container">
      <button onClick={onClick} className="load-more-button">
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
