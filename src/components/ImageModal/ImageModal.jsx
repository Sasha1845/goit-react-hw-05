"use client";

import Modal from "react-modal";
import "./ImageModal.css";

const ImageModal = ({ isOpen, onClose, image }) => {
  if (!image) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal-content"
      overlayClassName="modal-overlay"
      closeTimeoutMS={300}
    >
      <div className="modal-inner">
        <img
          src={image.urls.regular || "/placeholder.svg"}
          alt={image.alt_description || "Unsplash image"}
          className="modal-image"
        />

        <div className="image-info">
          <h2>{image.alt_description || "Untitled image"}</h2>

          <div className="author-info">
            <img
              src={image.user.profile_image.small || "/placeholder.svg"}
              alt={image.user.name}
              className="author-avatar"
            />
            <div>
              <p className="author-name">Photo by {image.user.name}</p>
              {image.user.instagram_username && (
                <p className="author-social">
                  Instagram: @{image.user.instagram_username}
                </p>
              )}
            </div>
          </div>

          <div className="image-stats">
            <p>❤️ {image.likes} likes</p>
            <p>📅 {new Date(image.created_at).toLocaleDateString()}</p>
          </div>

          {image.description && (
            <div className="image-description">
              <p>{image.description}</p>
            </div>
          )}
        </div>

        <button className="close-button" onClick={onClose}>
          ✕
        </button>
      </div>
    </Modal>
  );
};

export default ImageModal;
