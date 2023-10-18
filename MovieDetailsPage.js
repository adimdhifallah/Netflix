import React from 'react';

const API_IMG = "https://image.tmdb.org/t/p/w500"

const MovieDetailsPage = (props) => {
  const { movie } = props.location.state;

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <img src={API_IMG + movie.poster_path} alt={movie.title} />
        </div>
        <div className="col-md-8">
          <h3>{movie.title}</h3>
          <p>{movie.overview}</p>
          <p>Date de sortie : {movie.release_date}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailsPage;
