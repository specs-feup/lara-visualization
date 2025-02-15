import { addThemeSwitchListener } from "./theme.js";
import { addContinueButtonEventListeners, getWebSocket } from "./communication.js";
import { addResizerEventListeners } from "./visualization.js";

const setupEventListeners = (ws: WebSocket): void => {
  addThemeSwitchListener();
  addContinueButtonEventListeners(ws);
  addResizerEventListeners();
}

(() => {
  let ws: WebSocket;
  const setupWebSocket = () => {
    ws = getWebSocket();
    ws.addEventListener('close', () => setTimeout(setupWebSocket, 1000));
  };
  setupWebSocket();

  setupEventListeners(ws!);
})();
