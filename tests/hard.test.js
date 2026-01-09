import { get } from "../utils/http.js";
import { generateCustomReport } from "../utils/reporter.js";

export const options = {
  stages: [
    { duration: "10s", target: 10 },
    { duration: "20s", target: 50 },
    { duration: "10s", target: 0 },
  ],
};

export default function () {
  const pathsString = __ENV.PATHS || "/";
  const paths = pathsString.split(",").map(p => p.trim());

  paths.forEach(path => {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    get(cleanPath);
  });
}

export function handleSummary(data) {
  return {
    "reports/summary.html": generateCustomReport(data),
    "reports/summary.json": JSON.stringify(data),
  };
}
