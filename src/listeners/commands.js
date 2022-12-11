const pairFunction = async ({ command, ack, respond }) => {
  // Acknowledge command request
  await ack();
  console.log(command);
};


export default async function registerCommands(app) {
  app.command('/pair', pairFunction);
}
