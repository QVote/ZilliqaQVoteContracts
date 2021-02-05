import { CONTRACT_CODE, scillaServerUrl } from './config';
import { readFileSync } from 'fs';
import fetch from 'node-fetch';
import { writeFile, getFileName } from './utill';

/*
need to call: 
    code: makeTempFileName(id, 'scilla'),
    init: makeTempFileName(id, 'json', 'init'),
    blockchain: makeTempFileName(id, 'json', 'blockchain'),
    output: makeTempFileName(id, 'json', 'output'),
    gaslimit: req.body.gaslimit,
*/

const _RESULT_PREFIX = "result";

(async () => {
    try {

        const init = readFileSync('./tests/init_1.json', 'utf-8')
        const blockchain = readFileSync('./tests/blockchain_1.json', 'utf-8')
        const output = readFileSync('./tests/output_1.json', 'utf-8')
        const message = readFileSync('./tests/message_1.json', 'utf-8')
        const state = readFileSync('./tests/state_1.json', 'utf-8');
        console.log(JSON.stringify(
            {
                "init": init,
                "blockchain": blockchain,
                "output": output,
                "gaslimit": "100000"
            }
        ))
        const res = await fetch(scillaServerUrl + "/contract/call", {
            method: "POST", body: JSON.stringify(
                {
                    "code": CONTRACT_CODE,
                    "init": init,
                    "blockchain": blockchain,
                    "output": output,
                    "message": message,
                    "state": state,
                    "gaslimit": "100000"
                }
            ), headers: { 'Content-Type': 'application/json' },
        });
        const json: { result: string, message: string } = await res.json();
        writeFile('./tests', getFileName(_RESULT_PREFIX, "1"), "json", json);
        console.log(json.result);
        console.error(json.message);

    } catch (e) {
        console.error(e);
    }
})();