import React from "react";

const Hero = () => {
  return (
    <section className="hero" id="discover">
      <div className="hero-background" />
      <div className="hero-glow" />
      <div className="hero-content">
        <span className="hero-label">98% Match • Sci-Fi Thriller</span>
        <h1 className="hero-title">Discover your next cinematic obsession.</h1>
        <p className="hero-copy">
          Explore personalized movie recommendations powered by AI and find films that match your taste in mood, genre, and story.
        </p>
        <div className="hero-actions">
          <button className="button button-primary">Browse Now</button>
          <button className="button button-secondary">Why it fits</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
