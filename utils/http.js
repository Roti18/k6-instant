import http from "k6/http";
import { BASE_URL, API_KEY } from "./env.js";

const headers = {
  "Content-Type": "application/json",
  ...(API_KEY
    ? {
        Authorization: `Bearer ${API_KEY}`,
      }
    : {}),
};

export const get = (path, params = {}) =>
  http.get(`${BASE_URL}${path}`, { headers, ...params });

export const post = (path, body, params = {}) =>
  http.post(`${BASE_URL}${path}`, JSON.stringify(body), { headers, ...params });
