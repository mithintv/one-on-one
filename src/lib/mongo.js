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
  await mongo.connect();
  const workspaces = mongo.db("one-on-one").collection("workspaces");
  const result = await workspaces.insertOne(installation);
  return result;
}

export async function fetchInstallation(installQuery) {
  await mongo.connect();
  const workspaces = mongo.db("one-on-one").collection("workspaces");
  return await workspaces.findOne({ "team.id": installQuery.teamId });
}

export async function deleteInstallation(team_id) {
  await mongo.connect();
  const workspaces = mongo.db("one-on-one").collection("workspaces");
  const query = await workspaces.findOne({ 'team.id': team_id });
  const result = await workspaces.deleteOne(query);
  return { query, result };
}

export default mongo;
