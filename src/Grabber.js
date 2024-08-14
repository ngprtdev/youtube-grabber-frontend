import React, { useState } from "react";
import axios from "axios";
import style from "./Grabber.css";

const Grabber = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnails, setThumbnails] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    setThumbnails([]);
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/youtube-thumbnail",
        { url: videoUrl }
      );
      setThumbnails(response.data.thumbnails);
      setError(null);
    } catch (error) {
      console.error("There was an error fetching the thumbnails!", error);
      setError(
        error.response?.data?.message ||
          "Failed to fetch thumbnails. Please try again."
      );
    }
  };

  console.log(thumbnails);

  return (
    <div className="grabberContent">
      <h1>YouTube Thumbnail Grabber</h1>
      <p>
        Download your favorite YouTube thumbnail using this YouTube video
        grabber tool
      </p>
      <div className="tokeeLogo">
        <p>by</p>
        <img
          src="https://uploads-ssl.webflow.com/6482d3c81a3b206db8abe88e/66bb754b12b0368bee5cb126_logo.png"
          alt="Tokee logo"
        />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="imagesContent">
          <div className="youtubeUrlSection">
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="Paste your YouTube video url here"
            />
            <button type="submit">Download</button>
          </div>
          {error && <p className="error-message">{error}</p>}
          <div className="thumbnailsToList">
            {thumbnails.length > 0 &&
              thumbnails.map((thumbnail, index) => (
                <div key={index} className="thumbnail-container">
                  {thumbnail.error ? (
                    <p className="image-error">{thumbnail.error}</p>
                  ) : (
                    <>
                      <p>{thumbnail.text}</p>

                      <p>{thumbnail.size}</p>
                      <a
                        href={thumbnail.url}
                        download={`thumbnail_${index}.jpg`}
                      >
                        <img
                          src={thumbnail.url}
                          alt={`Thumbnail ${index}`}
                          onError={(e) => {
                            e.target.style.display = "none";
                            const errorMsg = document.createElement("p");
                            errorMsg.textContent = "Image not found";
                            errorMsg.className = "image-error";
                            e.target.parentElement.appendChild(errorMsg);
                          }}
                        />
                      </a>
                    </>
                  )}
                </div>
              ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Grabber;
