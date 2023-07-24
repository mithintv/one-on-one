const checkRetry = async ({ context, next }) => {
  try {
    if (context.retryNum) {
      console.log(`Middleware Running. Retry Attempt: ${context.retryNum}`);
    }
    await next();
  }
  catch (error) {
    console.error(error);
  }

};

export default function registerMiddleware(app) {
  app.use(checkRetry);
}
