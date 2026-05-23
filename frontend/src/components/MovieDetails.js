import React, { useState } from "react";

function MovieDetails({ data, onClose }) {
  if (!data) return null;

  const [isFavorite, setIsFavorite] = useState(false);
  const [isInList, setIsInList] = useState(false);

  const castDetailed = Array.isArray(data.cast_detailed) ? data.cast_detailed : (data.cast_list || []);
  const rating = data.rating ?? data.vote_average ?? 0;
  const voteCount = data.vote_count ?? data.votes ?? 0;
  const title = data.title || data.name || "Untitled";
  const synopsis = data.synopsis || data.overview || `Details are not available for "${title}."`;
  const releaseDate = data.release_date || data.year || "TBA";
  const runtime = data.runtime || "—";
  const genres = Array.isArray(data.genres) ? data.genres : (data.genres ? data.genres.split(",") : []);
  
  // Handle poster URLs from both TMDB formats
  let posterUrl = null;
  if (data.poster && data.poster.startsWith('http')) {
    posterUrl = data.poster;
  } else if (data.poster_path && !data.poster_path.startsWith('http')) {
    posterUrl = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
  } else if (data.image) {
    posterUrl = data.image;
  }
  
  let backdropUrl = null;
  if (data.backdrop && data.backdrop.startsWith('http')) {
    backdropUrl = data.backdrop;
  } else if (data.backdrop_path && !data.backdrop_path.startsWith('http')) {
    backdropUrl = `https://image.tmdb.org/t/p/w1280${data.backdrop_path}`;
  }
  
  const displayPoster = posterUrl || backdropUrl;

  const renderStars = (score) => {
    const stars5 = Math.max(0, Math.min(5, score / 2));
    const full = Math.floor(stars5);
    const half = stars5 - full >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);
    return (
      <span className="stars-row">
        {'★'.repeat(full)}
        {half && <span>☆</span>}
        {'☆'.repeat(empty)}
      </span>
    );
  };

  return (
    <div className="movie-details-container">
      {/* Backdrop Hero Section */}
      <div className={backdropUrl ? "details-hero-backdrop" : "details-hero-backdrop hero-backdrop-fallback"}>
        {backdropUrl && (
          <img 
            src={backdropUrl} 
            alt={title}
            className="details-backdrop-img"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        )}
        <div className="details-hero-gradient-overlay" />
      </div>

      {/* Close Button */}
      <button className="details-close-btn" onClick={onClose}>
        ✕ Close
      </button>

      {/* Main Content */}
      <div className="details-content-wrapper">
        <div className="details-hero-content">
          {/* Poster Section */}
          <div className="details-poster-section">
            {displayPoster ? (
              <img 
                src={displayPoster} 
                alt={title} 
                className="details-poster-img"
                onError={(e) => {
                  e.target.src = '/placeholder-poster.jpg';
                }}
              />
            ) : (
              <div className="details-poster-fallback">{title.charAt(0)}</div>
            )}
          </div>

          {/* Info Section */}
          <div className="details-info-section">
            {/* Title */}
            <h1 className="details-title">{title}</h1>

            {/* Release Info */}
            <div className="details-meta-line">
              <span className="meta-item">{releaseDate}</span>
              {genres.length > 0 && (
                <>
                  <span className="meta-separator">•</span>
                  <span className="meta-item">{genres.join(", ")}</span>
                </>
              )}
              {runtime !== "—" && (
                <>
                  <span className="meta-separator">•</span>
                  <span className="meta-item">{runtime}</span>
                </>
              )}
            </div>

            {/* Rating Section */}
            <div className="details-rating-section">
              <div className="rating-circle">
                <span className="rating-percentage">{Math.round(rating * 10)}</span>
              </div>
              <div className="rating-info">
                <div className="rating-stars-row">{renderStars(rating)}</div>
                <span className="user-score-label">User Score</span>
                {voteCount > 0 && <span className="vote-count">{voteCount.toLocaleString()} votes</span>}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="details-action-buttons">
              <button 
                className={`action-btn ${isFavorite ? 'active' : ''}`}
                onClick={() => setIsFavorite(!isFavorite)}
                title="Add to favorites"
              >
                ♥ {isFavorite ? 'Favorited' : 'Favorite'}
              </button>
              <button 
                className={`action-btn ${isInList ? 'active' : ''}`}
                onClick={() => setIsInList(!isInList)}
                title="Add to list"
              >
                ⊕ {isInList ? 'In List' : 'List'}
              </button>
              <button className="action-btn" title="Share">
                ⬆ Share
              </button>
            </div>

            {/* Synopsis */}
            <div className="details-synopsis-section">
              <h3 className="section-title">Overview</h3>
              <p className="synopsis-text">{synopsis}</p>
            </div>

            {/* Credits */}
            {(data.director || data.writer) && (
              <div className="details-credits-section">
                {data.director && (
                  <div className="credit-item">
                    <span className="credit-title">{data.director}</span>
                    <span className="credit-role">Director</span>
                  </div>
                )}
                {data.writer && (
                  <div className="credit-item">
                    <span className="credit-title">{data.writer}</span>
                    <span className="credit-role">Writer</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Cast Section */}
        {castDetailed.length > 0 && (
          <div className="details-cast-section">
            <h3 className="section-title casting-title">Cast</h3>
            <div className="cast-grid-detailed">
              {castDetailed.slice(0, 12).map((member, index) => (
                <div key={index} className="cast-card-detailed">
                  <div className="cast-photo-container">
                    {member.photo || member.profile_path ? (
                      <img
                        src={member.photo || (member.profile_path && `https://image.tmdb.org/t/p/w185${member.profile_path}`)}
                        alt={member.name}
                        className="cast-photo-detailed"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="cast-photo-placeholder-detailed">
                        {member.name?.charAt(0) || "?"}
                      </div>
                    )}
                  </div>
                  <p className="cast-name-detailed">{member.name}</p>
                  {member.character && <p className="cast-character-detailed">{member.character}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieDetails;
