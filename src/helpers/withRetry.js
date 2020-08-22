import { NETWORK_RETRY_ATTEMPTS } from "../core/config";

/**
 * Hi Order Function: Retry n times before reject
 * Remember that rounds start counting after the 1st call
 * @param {function} functionToCall The function to be called
 * @param {number} retriesAttempts An optional array with number of seconds to wait before retry another network call, eg: [1, 10, 60, 600]
 * @param {function} onError An optional callback on every attempt that fails
 */
export const withRetry = (functionToCall, onError, retriesAttempts = [...NETWORK_RETRY_ATTEMPTS]) => {
  const worker = (fn, myRetries, resolve, reject, ...params) => {
    fn(...params)
      .then(resolve)
      .catch(err => {
        if (myRetries.length === 0) return reject(err);

        const timeToWaitToRetry = myRetries.shift() * 1000;
        const nextPromise = () => worker(fn, [...myRetries], resolve, reject, ...params);

        if (onError) onError(err, myRetries, timeToWaitToRetry);
        return setTimeout(nextPromise, timeToWaitToRetry);
      });
  };

  return (...params) =>
    new Promise((resolve, reject) => worker(functionToCall, [...retriesAttempts], resolve, reject, ...params));
};
