import registerCommands from "./commands.mjs";
import registerEvents from "./events.mjs";

export default function registerListeners(app) {
  registerCommands(app);
  registerEvents(app);
}
