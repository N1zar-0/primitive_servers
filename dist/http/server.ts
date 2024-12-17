import * as http from "http";

const port = 3000;


const server = http.createServer((req, res) => {
    let message ="";

    req.on("data", (chunk) => {
        message += chunk;
    });

    req.on("end", () => {
        const clientAddress = `${req.socket.remoteAddress}:${req.socket.remotePort}`;
        const timestamp = new Date().toISOString();

        console.log(`[${timestamp}] Received message from ${clientAddress} : "${message}"`);

        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(message);

        console.log(`[${timestamp}] Response sent back to ${clientAddress}`);
    })
});


server.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});