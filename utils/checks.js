import { check } from "k6";

export const checkOK = (res) => {
  check(res, {
    "status 2xx": (r) => r.status >= 200 && r.status < 300,
  });
};

export const checkFast = (res, ms = 200) => {
  check(res, {
    [`p95 < ${ms}ms`]: (r) => r.timings.duration < ms,
  });
};
