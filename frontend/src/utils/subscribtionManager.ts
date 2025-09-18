export class SubscribtionManager {

  private ws: WebSocket;
  private static instance: SubscribtionManager;
  private bufferedMessage = [];
  private initialized: boolean = false;
  private callbacks: { [type: string]: Array<(...args: unknown[]) => void> } = {}

  private constructor() {
    this.bufferedMessage = [];
    this.ws = new WebSocket("ws://localhost:8080");
    this.initialized = false;
    this.init()
  }

  private init() {
    this.ws.onopen = () => {
      this.initialized = true;
      this.bufferedMessage.map(x => {
        this.ws.send(JSON.stringify(x));
      });
      this.bufferedMessage = [];
    }

    this.ws.onmessage = (data: any) => {
      const parsedData = JSON.parse(data.data);
      const newParse = JSON.parse(parsedData);
      this.callbacks[newParse.symbol].map((callback: any) => {
        callback(newParse);
      })
    }
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new SubscribtionManager();
      return this.instance;
    }
    return this.instance;
  }

  registerCallback(type: any, callback: any) {
    this.callbacks[type] = this.callbacks[type] || [];
    this.callbacks[type].push(callback);
  }

  deregisterCallback(type: any) {
    if (this.callbacks[type]) {
      delete this.callbacks[type];
    }
  }

  subscribe(message: any) {
    if (!this.initialized) {
      this.bufferedMessage.push(message);
    }
    this.ws.send(JSON.stringify(message));
  }
  public closeConnection() {
    this.ws.close();
  }
}
