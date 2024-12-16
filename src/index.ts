//1-2

async function getIp() {
    const response = await fetch('https://api.ipify.org?format=json');

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.ip;
}

getIp()
    .then(ip => console.log(`IP address is ${ip}\n\n`))
    .catch(err => console.log("Failed to fetch IP address"));


// 3.1

async function getThreeNames1() {
    const url = "https://random-data-api.com/api/name/random_name";

    try {
        const responses = await Promise.all([
            fetch(url),
            fetch(url),
            fetch(url)
        ]);

        const names = await Promise.all(responses.map(res => res.json()));
        return names.map(it => it.name);
    } catch (e) {
        console.error("Error in getThreeNames1:", e);
        throw e;
    }
}

getThreeNames1()
    .then(d => console.log(`getThreeNames1: ${d}`))
    .catch(err => console.error("Error"));


// 3.2

async function fetchName(url: string): Promise<string> {
    const response = await fetch(url);

    const data = await response.json();
    return data.name;
}

async function getThreeNames2() {
    const url = "https://random-data-api.com/api/name/random_name";

    try {
        const promise1 = fetchName(url);
        const promise2 = fetchName(url);
        const promise3 = fetchName(url);

        const name1 = await promise1;
        const name2 = await promise2;
        const name3 = await promise3;

        return [name1, name2, name3];
    } catch (e) {
        console.error("Error in getThreeNames2:", e);
        throw e;
    }
}

getThreeNames2()
    .then(d => console.log(`getThreeNames2: ${d}`))
    .catch(err => console.error("Error"));

// 3.3

function fetchName1(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
        fetch(url).then(res => res.json()).then(it => resolve(it.name))
            .catch(err => reject(err));
    });
}

function getThreeNames3() {
    const url = "https://random-data-api.com/api/name/random_name";

    return new Promise((resolve, reject) => {
        let res = ""

        fetchName1(url)
            .then(name1 => {
                res = name1;
                return fetchName1(url);
            })
            .then(name2 => {
                res += `, ${name2}`;
                return fetchName1(url);
            })
            .then(name3 => {
                resolve(`${res}, ${name3}`);
            })
            .catch(err => reject(`Error in getThreeNames3: ${err}`));
    });
}


getThreeNames3()
    .then(d => console.log(`getThreeNames3: ${d}`))
    .catch(err => console.error("Error " + err));



// 4.1

// function makeRequest() {
//     const url = "https://random-data-api.com/api/users/random_user";
//     return fetch(url)
//         .then(res => {
//             if (!res.ok)
//                 throw new Error("Failed to fetch data");
//
//             return res.json();
//         })
//         .then(data => {
//             if (data.gender !== "Female")
//                 throw new Error("Not a female user");
//
//             return data;
//         });
// }
//
// function fetchFemaleUser() {
//     return makeRequest().catch(() => fetchFemaleUser());
// }
//
// fetchFemaleUser().then(user => console.log(user));


function makeRequest() {
    const url = "https://random-data-api.com/api/users/random_user";

    return new Promise((resolve, reject) => {
        fetch(url)
            .then(res => {
                if (!res.ok){
                    reject("Failed to fetch data");
                    return;
                }

                return res.json();
            })
            .then(data => {
                if (data.gender !== "Female")
                    reject("Not a female user");
                else
                    resolve(data);
            })
            .catch(err => reject(err));
    })
}

function fetchFemaleUser() {
    return new Promise((resolve, reject) => {

        makeRequest()
            .then(user => resolve(user))
            .catch(() => {
                fetchFemaleUser()
                    .then(user => resolve(user))
                    .catch(e => reject(e));
            });
    });}

fetchFemaleUser().then(user => console.log(user));


// 4.2

async function fetchFemaleUser2() {
    const url = "https://random-data-api.com/api/users/random_user";
    let user;

    do {
        let response = await fetch(url);
        if (!response.ok)
            continue;

        user = await response.json();
    } while (user.gender !== "Female");

    return user;
}

fetchFemaleUser2().then(user => console.log(user));


// 5

function doSomethingWithIP(callback: (IP: string) => any) {
    fetch('https://api.ipify.org?format=json')
        .then(res => res.json())
        .then(data => callback(data.ip));
}

function getIPAsync() {
    return new Promise((resolve, reject) => {
        doSomethingWithIP((IP: string) => {
            if (IP)
                resolve(IP);
            else
                reject("Failed to get IP");
        });
    });
}

getIPAsync().then(IP => console.log(IP));

// 6

async function processIPWithCallback(callback: (IP: string) => any) {
    const IP = await getIPAsync();
    callback(IP as string);
}