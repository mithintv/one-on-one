let setTime, getTime, interval;

if (process.env.NODE_ENV === 'development') {
  setTime = 'setMinutes';
  getTime = 'getMinutes';
  interval = 15;
} else {
  setTime = 'setDate';
  getTime = 'getDate';
  interval = 28;
}

export { setTime, getTime, interval };
