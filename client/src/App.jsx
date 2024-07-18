import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./components/HomePage";
import JourneyForm from "./components/JourneyForm";
import CollectionSummary from "./components/CollectionSummary";
import PassengerSummary from "./components/PassengerSummary";
import "./css/App.css";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/journey" element={<JourneyForm />} />
          <Route path="/collection-summary" element={<CollectionSummary />} />
          <Route path="/passenger-summary" element={<PassengerSummary />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
