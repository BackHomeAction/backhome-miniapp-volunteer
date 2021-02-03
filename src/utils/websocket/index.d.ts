declare class Ws {
  constructor();
  connect();
  disconnect();
  send(destination: string, message: string);
}

export default Ws
