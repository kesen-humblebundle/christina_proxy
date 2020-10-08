import http from 'k6/http';
import { check } from 'k6';
import { Rate } from 'k6/metrics';

// Track error rate, product_ids hit (between 9e6 and 1e7)
let errorRate = new Rate('errorRate');

// 10 VUs, each needs to achieve 100 RPS (since 1 user achieving 1000 RPS seems a bit beyond PC capabilities)
export let options = {
  rps: 2000,
  vus: 30,
  duration: '1m'
};

export default function() {
  let response = http.get(`http://localhost:3000/`);

  check(response, {
    'code 200': (r) => r.status === 200
  });

  errorRate.add(response.status >= 400);
}
