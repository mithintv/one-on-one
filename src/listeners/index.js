import registerMiddleware from "./middleware.js";
import registerCommands from "./commands.js";
import registerEvents from "./events.js";

export default function registerListeners(app) {
  registerMiddleware(app);
  registerCommands(app);
  registerEvents(app);
}
