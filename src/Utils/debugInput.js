// src/debugInput.js
const fs = require("fs");

let readline = global.readline;

if (typeof readline !== "function") {
    const inputFile = "../data-1.txt";
    const inArray = fs.readFileSync(inputFile, "utf8")
        .replace(/([0-9]*\n)*(Sortie d'erreur :|Standard Error Stream:)/g, "")
        .split("\n");

    readline = () => inArray.shift();
    global.readline = readline; // make it globally accessible like in codingame
}

function _readline() {
    const read = readline();
    console.error(read);
    return read;
}

module.exports = { _readline };
