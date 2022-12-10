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

const mongo = new MongoClient(uri);

export async function saveInstallation(installation) {
  const workspaces = mongo.db("one-on-one").collection("workspaces");
  const result = await workspaces.insertOne(installation);
  return result;
}

export async function deleteInstallation(team_id) {
  const workspaces = mongo.db("one-on-one").collection("workspaces");
  const query = { "team.id": team_id };
  const result = await workspaces.deleteOne(query);
  return result;
}

export default mongo;
