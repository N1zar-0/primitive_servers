import * as dgram from "dgram";

const PORT = 4000;
const SERVER_ADDRESS = "localhost";
const message = "Hello, UDP Server!";

const client = dgram.createSocket("udp4");
const startTime = Date.now();


client.send(message, PORT, SERVER_ADDRESS, (err) => {
    if (err) {
        console.error(`Error sending message: ${err.message}`);
        client.close();
    } else
        console.log(`Sent: "${message}"`);
});

client.on("message", (msg) => {
    const endTime = Date.now();
    const timeTaken = endTime - startTime;

    console.log(`Received: "${msg.toString()}"`);
    console.log(`Time taken: ${timeTaken}ms`);

    client.close();
});


client.on("error", (err) => {
    console.error(`Client error: ${err.message}`);
    client.close();
});