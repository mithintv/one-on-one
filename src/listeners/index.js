import registerCommands from "./commands";
import registerEvents from "./events";

export default function registerListeners(app) {
  registerCommands(app);
  registerEvents(app);
}
