let setTime, getTime, interval;

if (process.env.ENVIRO === 'testing') {
  setTime = 'setMinutes';
  getTime = 'getMinutes';
  interval = 20;
} else {
  setTime = 'setDate';
  getTime = 'getDate';
  interval = 28;
}

export { setTime, getTime, interval };
