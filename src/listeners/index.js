import registerMiddleware from "./middleware";
import registerCommands from "./commands";
import registerEvents from "./events";

export default function registerListeners(app) {
  registerMiddleware(app);
  registerCommands(app);
  registerEvents(app);
}
