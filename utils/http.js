import http from "k6/http";
import { BASE_URL, API_KEY } from "./env.js";
import { log } from "./logger.js";

const headers = {
  "Content-Type": "application/json",
  "Accept": "application/json, text/plain, */*",
  "Accept-Language": "en-US,en;q=0.9,id;q=0.8",
  "Accept-Encoding": "gzip, deflate, br",
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Origin": BASE_URL,
  "Referer": `${BASE_URL}/`,
  "Pragma": "no-cache",
  "Cache-Control": "no-cache",
  "Connection": "keep-alive",
  "Sec-Ch-Ua": '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
  "Sec-Ch-Ua-Mobile": "?0",
  "Sec-Ch-Ua-Platform": '"Windows"',
  "Sec-Fetch-Dest": "empty",
  "Sec-Fetch-Mode": "cors",
  "Sec-Fetch-Site": "same-origin",
  "DNT": "1",
  "Upgrade-Insecure-Requests": "1",
  "X-Requested-With": "XMLHttpRequest"
};

if (API_KEY) {
  headers["Authorization"] = API_KEY.startsWith("Bearer ") ? API_KEY : `Bearer ${API_KEY}`;
  headers["X-API-Key"] = API_KEY;
  headers["x-api-key"] = API_KEY;
  headers["api-key"] = API_KEY;
  headers["X-Auth-Token"] = API_KEY;
  headers["X-CSRF-Token"] = API_KEY;
  headers["X-XSRF-Token"] = API_KEY;
}

export const get = (path, params = {}) => {
  const url = `${BASE_URL}${path}`;
  const res = http.get(url, { headers, ...params });

  if (res.status >= 400) {
    log("error", `GET ${path} failed with status ${res.status}`, { status: res.status, url });
  } else {
    log("success", `GET ${path} success`, { status: res.status });
  }

  return res;
};

export const post = (path, body, params = {}) => {
  const url = `${BASE_URL}${path}`;
  const res = http.post(url, JSON.stringify(body), { headers, ...params });

  if (res.status >= 400) {
    log("error", `POST ${path} failed with status ${res.status}`, { status: res.status, url });
  } else {
    log("success", `POST ${path} success`, { status: res.status });
  }

  return res;
};
