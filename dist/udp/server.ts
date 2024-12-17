import * as dgram from "dgram";

const PORT = 4000;
const server = dgram.createSocket("udp4");


server.on("message", (msg, rinfo) => {
    const message = msg.toString();
    const timestamp = new Date().toISOString();

    console.log(        `[${timestamp}] Received message from ${rinfo.address}:${rinfo.port}: "${message}"`    );

    server.send(message, rinfo.port, rinfo.address, (err) => {
        if (err)
            console.error(`Error sending response: ${err.message}`);
        else
            console.log(`[${timestamp}] Sent back to ${rinfo.address}:${rinfo.port}`);
    });
});


server.on("listening", () => {
    const address = server.address();
    console.log(`UDP Server is listening on ${address.address}:${address.port}`);
});


server.on("error", (err) => {
    console.error(`Server error: ${err.message}`);
    server.close();
});


server.bind(PORT);