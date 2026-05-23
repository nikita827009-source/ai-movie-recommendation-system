import React from "react";

const MovieCard = ({ movie, onSelect }) => {
  const isObject = typeof movie === "object" && movie !== null;
  const title = isObject ? movie.title || movie.name || "Untitled" : movie;
  const posterUrl = isObject && (movie.poster || movie.poster_path || movie.image || movie.backdrop);
  const rating = isObject
    ? movie.rating ?? movie.vote_average ?? movie.vote ?? null
    : null;
  const subtitle = isObject
    ? [movie.year, Array.isArray(movie.genres) ? movie.genres.slice(0, 2).join("\u2022") : movie.genre]
        .filter(Boolean)
        .join(" \u2022 ")
    : "";

  return (
    <article className="movie-card" onClick={onSelect}>
      <div className="movie-card-poster">
        {posterUrl ? (
          <img src={posterUrl} alt={`Poster for ${title}`} className="movie-card-poster-img" />
        ) : (
          <div className="movie-card-poster-fallback">{title.charAt(0)}</div>
        )}
        {rating != null && (
          <span className="movie-card-badge">{rating.toFixed(1)}</span>
        )}
      </div>
      <div className="movie-card-body">
        <p className="movie-card-meta">{rating != null ? `Rated ${rating.toFixed(1)} / 10` : "Recommended"}</p>
        <h3 className="movie-card-title">{title}</h3>
        {subtitle && <p className="movie-card-subtitle">{subtitle}</p>}
      </div>
    </article>
  );
};

export default MovieCard;
