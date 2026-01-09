export function generateCustomReport(data) {
    const p95 = data.metrics.http_req_duration.values["p(95)"].toFixed(2);
    const avg = data.metrics.http_req_duration.values.avg.toFixed(2);
    const max = data.metrics.http_req_duration.values.max.toFixed(2);
    const requests = data.metrics.http_reqs.values.count;
    const errors = data.metrics.http_req_failed.values.passes;
    const errorRate = ((errors / requests) * 100).toFixed(1);
    const timestamp = new Date().toLocaleString();

    let testStatus = "PASSED";
    let statusColor = "#4ade80";

    if (data.metrics.http_req_failed.values.passes > 0) {
        testStatus = "FAILED (ERRORS)";
        statusColor = "#ff4d4d";
    }

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>K6 Result: ${testStatus}</title>
    <style>
        :root {
            --bg: #0a0a0a;
            --card-bg: #141414;
            --text-main: #ffffff;
            --text-dim: #a1a1a1;
            --accent: #ff4d4d;
            --border: #262626;
            --radius: 12px;
            --status-color: ${statusColor};
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { 
            font-family: 'Inter', -apple-system, system-ui, sans-serif; 
            background: var(--bg); 
            color: var(--text-main);
            padding: 60px 20px;
        }
        .container { max-width: 900px; margin: 0 auto; }
        
        header { 
            margin-bottom: 48px; 
            border-left: 4px solid var(--status-color);
            padding-left: 24px;
        }
        .status-badge {
            display: inline-block;
            background: var(--status-color);
            color: #000;
            padding: 4px 12px;
            border-radius: 6px;
            font-weight: 900;
            font-size: 0.75rem;
            margin-bottom: 12px;
            text-transform: uppercase;
        }
        h1 { font-size: 3rem; font-weight: 800; letter-spacing: -0.04em; margin-bottom: 4px; }
        .meta { font-size: 0.95rem; color: var(--text-dim); }
        
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; margin-bottom: 48px; }
        .card { padding: 32px; background: var(--card-bg); border: 1px solid var(--border); border-radius: var(--radius); }
        .card-label { font-size: 0.75rem; text-transform: uppercase; font-weight: 700; color: var(--text-dim); letter-spacing: 0.1em; margin-bottom: 12px; }
        .card-value { font-size: 2.5rem; font-weight: 800; }

        .table-wrapper { background: var(--card-bg); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; }
        table { width: 100%; border-collapse: collapse; }
        th { text-align: left; padding: 20px 24px; background: #1a1a1a; color: var(--text-dim); font-size: 0.8rem; text-transform: uppercase; border-bottom: 1px solid var(--border); }
        td { padding: 20px 24px; border-bottom: 1px solid var(--border); font-size: 1rem; }
        tr:last-child td { border-bottom: none; }

        footer { margin-top: 80px; font-size: 0.85rem; color: var(--text-dim); text-align: center; opacity: 0.6; }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <div class="status-badge">${testStatus}</div>
            <h1>Load Test Result.</h1>
            <div class="meta">Executed at ${timestamp}</div>
        </header>

        <div class="grid">
            <div class="card">
                <div class="card-label">Requests</div>
                <div class="card-value">${requests}</div>
            </div>
            <div class="card">
                <div class="card-label">P95 Latency</div>
                <div class="card-value">${p95}ms</div>
            </div>
            <div class="card">
                <div class="card-label">Success Rate</div>
                <div class="card-value" style="color: ${errorRate > 0 ? 'var(--accent)' : 'var(--status-color)'}">${(100 - errorRate).toFixed(1)}%</div>
            </div>
        </div>

        <div class="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th>Metric</th>
                        <th>Average</th>
                        <th>Max</th>
                        <th>P(95)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Duration</td>
                        <td>${avg}ms</td>
                        <td>${max}ms</td>
                        <td style="font-weight: 700;">${p95}ms</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <footer>
            Advanced K6 Reporting Engine
        </footer>
    </div>
</body>
</html>
  `;
}
