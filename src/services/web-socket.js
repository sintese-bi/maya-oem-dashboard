var exampleSocket = new WebSocket("ws://localhost:8081", "protocolOne");

export function openWebScoketConnection() {
  exampleSocket.onopen = function (event) {
    exampleSocket.send(
      "Aqui vai algum texto que o servidor esteja aguardando urgentemente!"
    );
  };
}
