"use client";

import "./ImageCard.css";

const ImageCard = ({ image, onClick }) => {
  return (
    <div className="image-card" onClick={onClick}>
      <img
        src={image.urls.small || "/placeholder.svg"}
        alt={image.alt_description || "Unsplash image"}
        className="card-image"
        loading="lazy"
      />
    </div>
  );
};

export default ImageCard;
