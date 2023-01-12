const checkRetry = async ({ context, next }) => {
  try {
    if (context.retryNum) {
      console.log(`Middleware Running. Retry Attempt: ${context.retryNum}`);
      return;
    }
  }
  catch (error) {
    console.error(error);
  }
  await next();
};

export default function registerMiddleware(app) {
  app.use(checkRetry);
}
