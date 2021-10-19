import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 1000,
      timeUnit: '1s', // 1000 iterations per second, i.e. 1000 RPS
      duration: '20s',
      preAllocatedVUs: 100, // how large the initial pool of VUs would be
      maxVUs: 1000, // if the preAllocatedVUs are not enough, we can initialize more
    },
  },
};

export default function () {
  const BASE_URL = 'http://localhost:3000';

  const min = 900011;
  const max = 1000011;
  const randID = Math.floor(Math.random() * (max - min + 1) + min);

  http.get(`${BASE_URL}/products/${randID}`);
  sleep(1);
}
