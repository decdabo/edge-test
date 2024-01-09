import axios from "axios";

const BASE_URL = process.env.API_BASE_URL;

export const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json'
    } 
})
