import { io } from "socket.io-client";

export const mainSocket = io("http://54.180.10.194:38120/main");
export const messageSocket = io("http://54.180.10.194:38120/message");