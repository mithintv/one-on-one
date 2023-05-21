let setTime, getTime, interval, first;

if (process.env.ENVIRO === 'testing') {
  setTime = 'setMinutes';
  getTime = 'getMinutes';
  interval = 2;
  first = 1;
} else {
  setTime = 'setDate';
  getTime = 'getDate';
  interval = 28;
  first = 7;
}

export { setTime, getTime, interval, first };
