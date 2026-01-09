# K6 Instant Pro

This project is designed to run k6 load tests instantly and flexibly with premium visual reporting.

## Requirements
- k6 installed on your system (accessible via command line).
- PowerShell or Command Prompt.

## Project Structure
- `tests/`: Contains workload configurations (smoke, slow, hard, spike, soak).
- `utils/`: Helper modules for HTTP, environment variables, and report generation.
- `reports/`: Storage for test results (HTML and JSON).
- `k6.bat`: Main command wrapper to execute tests.

## Usage

Use the `.\k6` command with the following format:

```bash
.\k6 [test_name] [target_url] [paths_list] [api_key]
```

### Command Examples

1. Running a Smoke Test on Root:
```bash
.\k6 smoke http://localhost:3000
```

2. Running a Test on Multiple Endpoints Simultaneously:
```bash
.\k6 smoke http://localhost:3000 tracks,albums,users
```

3. Running a Test with an API Key:
```bash
.\k6 smoke http://localhost:3000 tracks,albums secret123
```

4. Running a Hard Test (Stress Test) for specific endpoints:
```bash
.\k6 hard http://localhost:3000 login,profile
```

5. Cleaning the Reports Folder:
```bash
.\k6 clean
```

## Test Profiles
- **smoke**: 1 user, 10s duration. Best for quick verification if the API is up.
- **slow**: Constant arrival rate configuration. Best for long-term stability testing.
- **hard**: Stress test with gradual load increases up to high levels.
- **spike**: Sudden traffic surges to test server resilience against unexpected shocks.
- **soak**: Sustained medium load over long durations to find memory leaks.

## Test Reporting
After each test execution, a premium visual report is automatically updated at:
`reports/summary.html`

Open this file in your browser to see latency statistics (P95), success rates, and other metrics in a modern dark-mode dashboard.

## Default Configuration
If arguments are not fully provided, the system uses these defaults:
- **Test Name**: (Required)
- **Target URL**: (Required)
- **Paths List**: `/` (root)
- **API Key**: Uses the default value from `utils/env.js`
