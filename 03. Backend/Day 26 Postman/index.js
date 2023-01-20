import app from './src/app';
import http from "http";

const PORT = 1338;

http.createServer(app).listen(PORT, () => {
    console.log("Server is running");
})