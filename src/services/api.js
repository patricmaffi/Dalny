import axios from "axios";

const api = axios.create({
    baseURL: "https://127.0.0.1",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-api-key": "Xw5lCkjHzx8aUTwWMrUCA7ZMxZoj5l5zaTCQ8Xoq",
    },
});

export default api;
