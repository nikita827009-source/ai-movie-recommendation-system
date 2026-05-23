import React from "react";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-brand">
        <span className="brand-accent">Movie</span>AI
      </div>
      <nav className="navbar-links">
        <a href="#discover">Discover</a>
        <a href="#recommendations">Recommendations</a>
        <a href="#contact">Contact</a>
      </nav>
      <input className="navbar-search" placeholder="Search a movie..." aria-label="Search movies" />
    </header>
  );
};

export default Navbar;
