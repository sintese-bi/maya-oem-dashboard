export let amountOfSentEmails = 0;

export function openWebSocketConnection() {
  var exampleSocket = new WebSocket("ws://localhost:8081", "protocolOne");

  exampleSocket.onopen = function (event) {
    exampleSocket.send(
      "Aqui vai algum texto que o servidor esteja aguardando urgentemente!"
    );
    exampleSocket.onmessage = (message) => {
      console.log(message);
      amountOfSentEmails++;
    };
  };
  exampleSocket.onerror = (err) => {
    console.log(err);
  };
}
