import React, { useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import MovieDetails from "./MovieDetails";

const Recommendations = () => {
  const [movie, setMovie] = useState("");
  const [data, setData] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getRecommendations = async (event) => {
    event?.preventDefault();
    setError("");
    setSelectedMovie(null);

    if (!movie.trim()) {
      setError("Please enter a movie title to get recommendations.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("http://127.0.0.1:5000/recommend", {
        movie: movie.trim(),
      });

      const recommendations = res.data?.recommendations || res.data || [];
      if (!Array.isArray(recommendations)) {
        throw new Error("Unexpected response from the recommendation server.");
      }
      setData(recommendations);
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Unable to fetch recommendations.";
      setError(
        message.includes("Network Error")
          ? "Could not reach the backend. Start the Flask API on port 5000 and try again."
          : message
      );
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const selectMovie = (item) => {
    if (typeof item === "string") {
      setSelectedMovie({
        title: item,
        synopsis: `Details are not available for "${item}" but you can continue exploring similar recommendations.`,
      });
    } else {
      setSelectedMovie(item);
    }
  };

  return (
    <section className="section recommendations" id="recommendations">
      <div className="section-header">
        <div>
          <p className="section-overline">AI-powered suggestions</p>
          <h2 className="section-heading">Find your next favorite movie.</h2>
          <p className="section-copy">
            Enter a title and let the recommendation engine surface curated cinematic picks tailored to your taste.
          </p>
        </div>
        <div className="search-panel">
          <form className="search-form" onSubmit={getRecommendations}>
            <input
              className="search-input"
              value={movie}
              onChange={(e) => setMovie(e.target.value)}
              placeholder="Enter a movie name"
              aria-label="Movie search"
            />
            <button className="button button-primary" type="submit" disabled={loading}>
              {loading ? "Finding movies..." : "Get Recommendations"}
            </button>
          </form>
          {error && <p className="status-message status-error">{error}</p>}
          {!error && !loading && data.length === 0 && (
            <p className="status-message">
              Start with a movie title to see custom recommendations with posters, ratings, and cast details.
            </p>
          )}
        </div>
      </div>

      <div className="movies-grid">
        {data.length > 0
          ? data.map((item, index) => (
              <MovieCard key={index} movie={item} onSelect={() => selectMovie(item)} />
            ))
          : Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="movie-card placeholder-card">
                <div className="placeholder-box" />
                <div className="placeholder-line short" />
                <div className="placeholder-line long" />
              </div>
            ))}
      </div>

      {selectedMovie && (
        <div className="details-panel">
          <MovieDetails data={selectedMovie} onClose={() => setSelectedMovie(null)} />
        </div>
      )}
    </section>
  );
};

export default Recommendations;
