import { importAst } from "./ast-import.js";

const getWebSocket = (): WebSocket => {
  const url = `ẁs://${window.location.host}`;
  return new WebSocket(url);
};

const sendData = (ws: WebSocket, data: any): void => {
  ws.send(JSON.stringify(data));
};

const parseMessage = (message: MessageEvent): any => {
  return JSON.parse(message.data);
};

const webSocketOnMessage = (message: MessageEvent, continueButton: HTMLButtonElement, astContainer: HTMLElement, codeContainer: HTMLElement): void => {
  const data = parseMessage(message);

    switch (data.message) {
      case 'update':
        importAst(data.ast, astContainer, codeContainer);
        break;

      case 'wait':
        continueButton.disabled = false;
        break;

      case 'continue':
        continueButton.disabled = true;
        break;
    }
};

const continueButtonOnClick = (continueButton: HTMLButtonElement, ws: WebSocket): void => {
  continueButton.disabled = true;
  sendData(ws, { message: 'continue' });
};

export {
  getWebSocket,
  sendData,
  parseMessage,
  webSocketOnMessage,
  continueButtonOnClick,
}
