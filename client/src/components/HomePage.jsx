import React from "react";
import { Link } from "react-router-dom";
import "../css/HomePage.css";

const HomePage = () => {
  return (
    <div className="home-container">
      <Link to="/journey">
        <button>Record Journey</button>
      </Link>
      <Link to="/collection-summary">
        <button>Collection Summary</button>
      </Link>
      <Link to="/passenger-summary">
        <button>Passenger Summary</button>
      </Link>
    </div>
  );
};

export default HomePage;
