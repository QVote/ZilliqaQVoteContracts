import fetch from 'node-fetch';
import { CONTRACT_CODE, scillaServerUrl, contractRelativeDir } from './config';
import { writeFileSync } from 'fs';

(async () => {
    try {
        const res = await fetch(scillaServerUrl + "/contract/check", {
            method: "POST", body: JSON.stringify(
                {
                    "code": CONTRACT_CODE,
                }
            ), headers: { 'Content-Type': 'application/json' },
        });
        const json: { result: string, message: string } = await res.json();
        console.log(json.result);
        const message = await JSON.parse(json.message);
        console.log(message)
        writeFileSync('./out/out.json', json.message);
    } catch (e) {
        console.error(e);
    }
})();