import axios from "axios";
import { API_URL } from "./apiURL";

export const GetRequest = async (url) => {
    try {
        const res = await axios({
            url: API_URL + url,
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
        return res ? res : res.data;
    } catch (err) { console.log(err); }
};

export const PostRequest = async (url, data) => {
    try {
        const res = await axios({
            url: API_URL + url,
            method: "POST",
            data,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
        return res ? res : res.data;
    } catch (err) { console.log(err); }
};

export const Api = {
    GetRequest,
    PostRequest,
};
