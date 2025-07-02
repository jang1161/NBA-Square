import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

let stompClient = null;

export function connect(onMessageReceived) {
  const socket = new SockJS("http://localhost:8080/ws"); // Spring WebSocket endpoint
  stompClient = new Client({
    webSocketFactory: () => socket,
    debug: (str) => console.log(str),
    onConnect: () => {
      console.log("STOMP 연결 성공");
      stompClient.subscribe("/topic/public", (message) => {
        onMessageReceived(JSON.parse(message.body));
      });
    },
    onStompError: (frame) => {
      console.error("STOMP 오류:", frame);
    }
  });

  stompClient.activate();
}

export function sendMessage(message) {
  if (stompClient && stompClient.connected) {
    stompClient.publish({
      destination: "/app/chat.send",
      body: JSON.stringify(message)
    });
  }
}
