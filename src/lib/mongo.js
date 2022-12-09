import 'dotenv/config';
import { MongoClient } from "mongodb";

/**
 * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
 * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
 */
let uri = `mongodb+srv://admin:${process.env.PASSWORD}@${process.env.CLUSTER}.mongodb.net/?retryWrites=true&w=majority`;

if (process.env.NODE_ENV !== "production") {
  uri = 'mongodb://localhost:27017/one-on-one';
}

const client = new MongoClient(uri);

export default client;
