import axios from "axios";

export const instance = axios.create({
    baseURL: "https://some-domain.com/api/", // check
    timeout: 1000,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true,
})