import { Api } from "../config/request";

let requestCreateJourney = async (data) => {
    let response = await Api.PostRequest("journey/create", data);
    return response.data;
};

let requestCollectionSummary = async () => {
    let response = await Api.GetRequest("journey/summary/collection");
    return response.data;
};

let requestPassengerSummary = async () => {
    let response = await Api.GetRequest("journey/summary/passenger");
    return response.data;
};

const JourneyApi = {
    requestCreateJourney,
    requestCollectionSummary,
    requestPassengerSummary,
};

export default JourneyApi;
