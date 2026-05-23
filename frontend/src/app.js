import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Recommendations from "./components/Recommendations";
import "./app.css";

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="page-content">
        <Hero />
        <Recommendations />
      </main>
    </div>
  );
}

export default App;
