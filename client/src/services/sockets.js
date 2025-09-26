import { io } from "socket.io-client";

// Connect to backend socket.io server
const socket = io("http://localhost:5000"); // make sure your backend runs on port 5000

export default socket;
