let setTime, getTime, interval, first, span;

if (process.env.ENVIRO === 'testing') {
  setTime = 'setMinutes';
  getTime = 'getMinutes';
  interval = process.env.INTERVAL;
  first = 1;
  span = "minutes";
} else {
  setTime = 'setDate';
  getTime = 'getDate';
  interval = 28;
  first = 7;
  span = "days";
}

export { setTime, getTime, interval, first, span };
