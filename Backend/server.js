import app from "./src/app.js";
import http from "http";
import config from "./src/config/config.js";
import connectDB from "./src/database/db.js";
import initSocket from "./src/sockets/socket.io.js";

const server = http.createServer(app);
connectDB();
initSocket(server); 



server.listen(config.PORT, () => {
  console.log("Server is connected");
});
