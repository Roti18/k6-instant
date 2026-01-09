import { get } from "../utils/http.js";
import { generateCustomReport } from "../utils/reporter.js";

export const options = {
  scenarios: {
    slow_and_steady: {
      executor: "constant-arrival-rate",
      rate: 10,
      timeUnit: "1s",
      duration: "30s",
      preAllocatedVUs: 1,
      maxVUs: 5,
    },
  },
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
