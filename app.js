import app, { expressReceiver } from "./src/lib/slackConfig.js";
import awsServerlessExpress from "aws-serverless-express";

const server = awsServerlessExpress.createServer(expressReceiver.app);

export const handler = (event, context) => {
  awsServerlessExpress.proxy(server, event, context);
};
