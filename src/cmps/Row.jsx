import movieTrailer from "movie-trailer";
import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import axios from "../services/axios.service";
import './Row.css'

export function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('')
  const baseUrl = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
    }
    fetchData();
  }, [fetchUrl]);

  async function getTrailerUrl(movie){
  
    if(trailerUrl){
      setTrailerUrl('')
    }else{
      movieTrailer(movie?.title || movie?.name || movie?.original_name || "")
      .then(url =>{
        console.log(url);
       const urlParams = new URLSearchParams(new URL([url]).search)
       console.log(urlParams);
       setTrailerUrl(urlParams.get('v'))
      })
      .catch((error)=> console.log(error))
    }
  }

  const opts ={
    height: "390",
    width: "100%",
    playerVars:{
    // https://developers.google.com/youtube/player_parameters
      autoplay: 1
    }
  }

  return (
    <section className="row">
      <h2>{title}</h2>
      <div className="row-posters">
        {movies.map((movie) => {
          return (
            <img
              className={`row-poster ${isLargeRow && "row-poster-large"}`}
              onClick={()=>getTrailerUrl(movie)}
              key={movie.id}
              src={`${baseUrl}${isLargeRow?movie.poster_path: movie.backdrop_path}`}
              alt={movie.name}
            />
          );
        })}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
    </section>
  );
}
