import fetch from 'node-fetch';
import { scillaServerUrl } from '../config';


class ScillaServer {
    /**
        @param ssUrl scilla server url defaults to config
        @param contractCode code of the .scilla contract
    */
    async check({ sSUrl = scillaServerUrl, contractCode }:
        { sSUrl?: string, contractCode: string }) {
        try {
            const res = await fetch(sSUrl + "/contract/check", {
                method: "POST", body: JSON.stringify(
                    {
                        "code": contractCode,
                    }
                ), headers: { 'Content-Type': 'application/json' },
            });
            const json: { result: string, message: string } = await res.json();
            let resJson = await this.processJson(json);
            return resJson;
        } catch (e) { throw e; }
    }

    /**
     * 
     * @param sSUrl scilla server url defaults to config
     * @param testBody body of the test to send
     * @param gaslimit defaults to 100000
     */
    async runTest({ sSUrl = scillaServerUrl, testBody, gaslimit = "100000" }:
        { sSUrl?: string, testBody: { [key: string]: string }, gaslimit?: string }) {
        try {
            const res = await fetch(sSUrl + "/contract/call", {
                method: "POST", body: JSON.stringify(
                    {
                        ...testBody,
                        gaslimit
                    }
                ), headers: { 'Content-Type': 'application/json' },
            });
            const json: { result: string, message: string } = await res.json();
            let resJson = await this.processJson(json);
            return resJson;
        } catch (e) { throw e; }
    }

    private async processJson(json: { result: string, message: string }) {
        let resJson: { result: string, message: string | { [key: string]: any } } = json;
        try {
            resJson.message = await JSON.parse(json.message);
        } catch (e) {
            // ok so message wasnt a json
        }
        return resJson;
    }
}

export default new ScillaServer();