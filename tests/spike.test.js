import { get } from "../utils/http.js";
import { generateCustomReport } from "../utils/reporter.js";
import { getLogs } from "../utils/logger.js";

export const options = {
    stages: [
        { duration: "10s", target: 10 },
        { duration: "20s", target: 200 },
        { duration: "10s", target: 200 },
        { duration: "20s", target: 10 },
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
    const logs = getLogs();
    return {
        "reports/summary.html": generateCustomReport(data, logs),
        "reports/summary.json": JSON.stringify(data),
        "reports/logs.json": JSON.stringify(logs, null, 2),
    };
}
