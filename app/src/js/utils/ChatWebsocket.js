export default class ChatWS {
  constructor(url, token, dispatcher) {
    this.websocket = new WebSocket(`ws://${url}?token=${token}`);

    this.websocket.onmessage = function (event) {
      dispatcher(JSON.parse(event.data));
    }

  }

  postMessage(text, fromID, toID) {
    this.websocket.send(
      JSON.stringify({
        event_type: 1,
        message: text,
        from: fromID,
        to: toID
      })
    );
  }

  close() {
    this.websocket.close();
  }

}
