import { readFileSync } from 'fs';
import { resolve } from 'path';

const getContractCode = (path: string) => {
    const code = readFileSync(path, 'utf-8').toString();
    return code;
}
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
    checkerOutput: resolve(`./scillaCheckerOutput`),
    testDir: resolve("./testResults")
}


export { scillaServerUrl, getContractCode, _dirs, _names };