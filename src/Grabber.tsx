import React, { useState } from "react";
import axios from "axios";
import { CiSearch } from "react-icons/ci";
import { RiDownload2Fill } from "react-icons/ri";
import { PiCopy } from "react-icons/pi";
import "./Grabber.css";
import GrabberExplanation from "./GrabberExplanation";

interface Thumbnail {
  url: string;
  size: string;
  text: string;
  error?: string;
}

const Grabber: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([]);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Typage de l'événement du formulaire et de la réponse API
  const handleSubmit = async (event: React.FormEvent) => {
    setThumbnails([]);
    event.preventDefault();
    try {
      const response = await axios.post<{ thumbnails: Thumbnail[] }>(
        "http://localhost:3001/youtube-thumbnail",
        { url: videoUrl }
      );
      setThumbnails(response.data.thumbnails);
      setError(null);
    } catch (error: any) {
      console.error("There was an error fetching the thumbnails!", error);
      setError(
        error.response?.data?.message ||
          "Failed to fetch thumbnails. Please try again."
      );
    }
  };

  const copyToClipboard = async (textToCopy: string, index: number) => {
    setClickedIndex(index);
    try {
      await navigator.clipboard.writeText(textToCopy);
    } catch (err) {
      console.error("Failed to copy text", err);
    }
    setTimeout(() => {
      setClickedIndex(null);
    }, 100);
  };

  const handleDownload = async (imageUrl: string) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/youtube-thumbnail/download",
        { url: imageUrl },
        { responseType: "blob" }
      );

      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "thumbnail.jpg";
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Failed to download the image:", error);
    }
  };

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
            <button type="submit">
              <CiSearch />
            </button>
          </div>
          {error && <p className="error-message">{error}</p>}
          {thumbnails.length === 0 && <GrabberExplanation />}
          {thumbnails.length > 0 && (
            <div className="thumbnailsToList">
              {thumbnails.map((thumbnail, index) => (
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
                            e.currentTarget.style.display = "none";
                            const errorMsg = document.createElement("p");
                            errorMsg.textContent = "Image not found";
                            errorMsg.className = "image-error";
                            e.currentTarget.parentElement?.appendChild(
                              errorMsg
                            );
                          }}
                        />
                      </a>
                      <div className="buttonLayout">
                        <button
                          type="button"
                          onClick={() => copyToClipboard(thumbnail.url, index)}
                          className={
                            clickedIndex === index
                              ? "isClicked"
                              : "isNotClicked"
                          }
                        >
                          <PiCopy />
                          Copy URL
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDownload(thumbnail.url)}
                        >
                          <RiDownload2Fill /> Download
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Grabber;
