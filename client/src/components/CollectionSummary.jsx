import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JourneyApi from "../services/journey";
import { RESPONSE_STATUS } from "../constants/status";

const stations = {
  1: "New Delhi Railway Station",
  2: "Airport",
};

const CollectionSummary = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState([]);

  const requestCollectionSummary = async () => {
    let response = await JourneyApi.requestCollectionSummary();
    console.log("response: ", response);
    if (response.status == RESPONSE_STATUS.ERROR) {
      alert(response.message);
    } else if (response.status == RESPONSE_STATUS.SUCCESS) {
      setSummary(response.data);
    }
  };

  useEffect(() => {
    requestCollectionSummary();
  }, []);

  return (
    <div>
      <button onClick={() => navigate("/")}>Go to Homepage</button>
      <h2>Collection Summary</h2>
      {summary.map((val, ind) => {
        return (
          <div key={ind}>
            <h4>{stations[val.station]}</h4>
            <p>Total Collection: {val.totalCollection}</p>
            <p>Total Discount: {val.totalDiscount}</p>
          </div>
        );
      })}
    </div>
  );
};

export default CollectionSummary;
