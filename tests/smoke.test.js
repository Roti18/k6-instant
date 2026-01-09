import { get } from "../utils/http.js";
import { checkOK } from "../utils/checks.js";
import { generateCustomReport } from "../utils/reporter.js";

export const options = {
  vus: 1,
  duration: "10s",
  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<500"],
  },
};

export default function () {
  const pathsString = __ENV.PATHS || "/";
  const paths = pathsString.split(",").map(p => p.trim());

  paths.forEach(path => {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    const res = get(cleanPath);
    checkOK(res);
  });
}

export function handleSummary(data) {
  return {
    "reports/summary.html": generateCustomReport(data),
  };
}
