import { Injectable } from '@angular/core';

declare var SockJS;
declare var Stomp;

@Injectable({
  providedIn: 'root'
})
export class MensajeService {
  public stompClient;
  public msg = [];

  constructor() {
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    const serverUrl = 'http://chaninfoodapirest-env-1.eba-qpcjtrfp.us-east-2.elasticbeanstalk.com/socketpedidos';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function (frame) {
      that.stompClient.subscribe('/message', (message) => {
        if (message.body) {
          that.msg.push(message.body);
        }
      });
    });
  }

  sendMessage(message) {
    this.stompClient.send('/app/send/message', {}, message);
  }
}
