import { io } from "socket.io-client";

export const mainSocket = io("https://api.gyopoom.kr:38120/main");
export const messageSocket = io("https://api.gyopoom.kr:38120/message");