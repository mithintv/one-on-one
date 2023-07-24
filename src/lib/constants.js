let setTime, getTime, interval, first, span;

if (process.env.ENVIRO === 'local') {
  setTime = 'setMinutes';
  getTime = 'getMinutes';
  interval = process.env.INTERVAL;
  first = 2;
  span = "minutes";
} else if (process.env.ENVIRO === 'testing') {
  setTime = 'setDate';
  getTime = 'getDate';
  interval = 1;
  first = 1;
  span = "days";
} else {
  setTime = 'setDate';
  getTime = 'getDate';
  interval = 28;
  first = 7;
  span = "days";
}

export { setTime, getTime, interval, first, span };
