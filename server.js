import app from './src/app.js';
import http from 'http';
import config from './src/config/config.js';
import connectDB from './src/database/db.js';

const server = http.createServer(app);
connectDB();

server.listen(config.PORT, ()=>{
    console.log("Server is connected");
})