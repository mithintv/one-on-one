import registerCommands from "../listeners/commands.js";

export default function registerListeners(app) {
  registerCommands(app);
}
