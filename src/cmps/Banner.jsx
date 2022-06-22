import { useEffect, useState } from "react";
import axios from "../services/axios.service";
import requests from "../services/requests.service";
import "./Banner.css";

export function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      const randomIdx = Math.floor(Math.random() * request.data.results.length);
      setMovie(request.data.results[randomIdx]);
    }
    fetchData();
  }, []);

  function overviewLength(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
        https://image.tmdb.org/t/p/original/${movie?.backdrop_path}
    )`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner-contents">
        <h1 className="banner-title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner-buttons">
          <button className="banner-button">Play</button>
          <button className="banner-button">My List</button>
        </div>
        <h1 className="banner-description">
          {overviewLength(movie?.overview, 150)}
        </h1>
      </div>
    <div className="banner-fade-bottom"></div>
    </header>
  );
}
