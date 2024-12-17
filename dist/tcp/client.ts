import { Socket } from "net";

const port = 5000;
const SERVER_ADDRESS = "localhost";
const message = "Hello, TCP Server!";

const client = new Socket();
const startTime = Date.now();


client.connect(port, SERVER_ADDRESS, () => {
    console.log(`Connected to TCP Server at ${SERVER_ADDRESS}:${port}`);

    client.write(message);
    console.log(`Sent: "${message}"`);
});


client.on("data", (data) => {
    const endTime = Date.now();
    const timeTaken = endTime - startTime;

    console.log(`Received: "${data}"`);
    console.log(`Time taken: ${timeTaken}ms`);

    client.end();
});


client.on("close", () => {
    console.log("Connection closed");
});