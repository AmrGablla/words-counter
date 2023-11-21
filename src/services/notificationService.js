import { notify } from "@kyvg/vue3-notification";
import { loggingLevels } from "./loggingLevels";

export function showMessage(msg) {
  msg = msg || "Success";
  notify(msg);
}

export function showError(msg) {
  msg = msg || "Error Happend please try again later.";
  notify({
    title: "Error",
    text: msg,
    type: "error",
  });
}

export function log(type = loggingLevels.log, ...args) {
  switch (type) {
    case loggingLevels.log:
      console.log(...args);
      break;
    case loggingLevels.warn:
      console.warn(...args);
      break;
    case loggingLevels.error:
      console.error(...args);
      break;
    default:
      console.log(...args);
  }
}
