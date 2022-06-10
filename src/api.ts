const BASE_URL = "https://api.coinpaprika.com/v1";

export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchCoinTickers(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchCoinOhlcv(coinId: string) {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 23;
  return fetch(
    `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
  ).then((response) => response.json());
}

export function fetchCoinPrices1(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}?quotes=USD,JPY,CNY`).then(
    (response) => response.json()
  );
}

export function fetchCoinPrices2(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}?quotes=EUR,GBP,KRW`).then(
    (response) => response.json()
  );
}

export function fetchCoinPrices3(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}?quotes=CHF,CAD,HKD`).then(
    (response) => response.json()
  );
}
