import { createServer } from "net";

const port = 5000;


const server = createServer((socket) => {
    const clientAddress = `${socket.remoteAddress}:${socket.remotePort}`;
    console.log(`New connection from ${clientAddress}`);

    let message ="";

    socket.on("data", (chunk) => {
        message += chunk;

        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] Received message from ${clientAddress}: "${message}"`);

        socket.write(message, () => {
            console.log(`[${timestamp}] Sent back to ${clientAddress}`);
        });
    });

    socket.on("close", () => {
        console.log(`Connection closed with ${clientAddress}`);
    });
});


server.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});