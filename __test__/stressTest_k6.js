import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '5s', target: 100 },
    { duration: '15s', target: 100 },
    { duration: '5s', target: 500 },
    { duration: '15s', target: 1000 },
  ],
};

export default function () {
  const BASE_URL = 'http://localhost:3000'; // make sure this is not production

  let responses = http.batch([
    [
      'GET',
      `${BASE_URL}/products/41232/styles`,
      null,
      { tags: { name: 'homepage' } },
    ],
    // [
    //   'GET',
    //   `${BASE_URL}/products/1/styles`,
    //   null,
    //   { tags: { name: 'homepage' } },
    // ],
    // [
    //   'GET',
    //   `${BASE_URL}/products/2/styles`,
    //   null,
    //   { tags: { name: 'homepage' } },
    // ],
    // [
    //   'GET',
    //   `${BASE_URL}/products/1/related`,
    //   null,
    //   { tags: { name: 'homepage' } },
    // ],
  ]);

  sleep(1);
}
