import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import JourneyApi from "../services/journey";
import { RESPONSE_STATUS } from "../constants/status";
import "../css/JourneyForm.css";

const JourneyForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    zeroCardId: "",
    startStation: "",
    endStation: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleStationChange = (e) => {
    let newForm = { ...form };
    if (e.target.value == 1) {
      newForm.startStation = 1;
      newForm.endStation = 2;
    } else {
      newForm.startStation = 2;
      newForm.endStation = 1;
    }
    setForm(newForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await JourneyApi.requestCreateJourney(form);
    console.log("response: ", response);
    if (response.status == RESPONSE_STATUS.ERROR) {
      alert(response.message);
    } else if (response.status == RESPONSE_STATUS.SUCCESS) {
      alert("Journey recorded successfully!");
      setForm({ zeroCardId: "", startStation: "", endStation: "" });
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="ZeroCard ID"
          name="zeroCardId"
          value={form.zeroCardId}
          onChange={handleChange}
          required
        />
        <select
          name="startStation"
          value={form.startStation}
          onChange={handleStationChange}
          required
        >
          <option value="">Start Station</option>
          <option value={1}>New Delhi Railway Station</option>
          <option value={2}>Airport</option>
        </select>
        <select name="endStation" value={form.endStation} required disabled>
          <option value="">End Station</option>
          <option value={1}>New Delhi Railway Station</option>
          <option value={2}>Airport</option>
        </select>
        <button type="submit">Record Journey</button>
      </form>
      <button onClick={() => navigate("/")}>Go to Homepage</button>
    </div>
  );
};

export default JourneyForm;
