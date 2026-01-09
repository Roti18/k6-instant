import http from "k6/http";
import { BASE_URL, API_KEY } from "./env.js";

const headers = {
  "Content-Type": "application/json",
};

if (API_KEY) {
  headers["Authorization"] = API_KEY.startsWith("Bearer ") ? API_KEY : `Bearer ${API_KEY}`;
  headers["X-API-Key"] = API_KEY;
  headers["x-api-key"] = API_KEY;
  headers["api-key"] = API_KEY;
  headers["X-Auth-Token"] = API_KEY;
}

export const get = (path, params = {}) =>
  http.get(`${BASE_URL}${path}`, { headers, ...params });

export const post = (path, body, params = {}) =>
  http.post(`${BASE_URL}${path}`, JSON.stringify(body), { headers, ...params });
