import registerCommands from "./commands.js";
import registerEvents from "./events.js";

export default function registerListeners(app) {
  registerCommands(app);
  registerEvents(app);
}
