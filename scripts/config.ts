import { readFileSync } from 'fs';
import { resolve } from 'path';

const CONTRACT_CODE = readFileSync('../contract/QVoting.scilla', 'utf-8');
const scillaServerUrl = "http://localhost:4000";

const _names = {
    out: "out",
    blockchain: "blockchain",
    init: "init",
    output: "output",
    message: "message",
    state: "state"
}

const _dirs = {
    checkerOutput: resolve(`./out`),
    testDir: resolve("./tests")
}


export { scillaServerUrl, CONTRACT_CODE, _dirs, _names };