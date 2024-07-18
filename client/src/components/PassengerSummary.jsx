import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JourneyApi from "../services/journey";
import { RESPONSE_STATUS } from "../constants/status";

const passengerTypes = {
  1: "Adults",
  2: "Kids",
  3: "Senior Citizens",
};

const PassengerSummary = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState([]);

  const requestPassengerSummary = async () => {
    let response = await JourneyApi.requestPassengerSummary();
    console.log("response: ", response);
    if (response.status == RESPONSE_STATUS.ERROR) {
      alert(response.message);
    } else if (response.status == RESPONSE_STATUS.SUCCESS) {
      setSummary(response.data);
    }
  };

  useEffect(() => {
    requestPassengerSummary();
  }, []);

  return (
    <div>
      <button onClick={() => navigate("/")}>Go to Homepage</button>
      <h2>Passenger Summary</h2>
      {summary.map((val, ind) => {
        return (
          <p key={ind}>
            {passengerTypes[val.passengerType]}: {val.count}
          </p>
        );
      })}
    </div>
  );
};

export default PassengerSummary;
