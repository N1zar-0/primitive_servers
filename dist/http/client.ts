import * as http from "http";

const port = 3000;
const message = "Hello, HTTP Server!";
const startTime = Date.now();

const options = {
    hostname: "localhost",
    port: port,
    path: "/",
    method: "POST",
    headers: {
        "Content-Type": "text/plain",
        "Content-Length": message.length,
    },
};

const req = http.request(options, (res) => {
    let responseData = "";

    res.on("data", (chunk) => {
        responseData += chunk;
    });

    res.on("end", () => {
        const endTime = Date.now();
        const timeTaken = endTime - startTime;

        console.log(`Sent: "${message}"`);
        console.log(`Received: "${responseData}"`);
        console.log(`Time taken: ${timeTaken}ms`);
    });
});

req.write(message);
req.end();