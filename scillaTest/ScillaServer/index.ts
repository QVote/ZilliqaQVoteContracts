import fetch from 'node-fetch';


class ScillaServer {
    host: string;

    constructor(host: string) {
        this.host = host;
    }
    /**
        @param contractCode code of the .scilla contract
    */
    async check({ contractCode }:
        { contractCode: string }) {
        try {
            const res = await fetch(`${this.host}/contract/check`, {
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
     * @param testBody body of the test to send
     * @param gaslimit defaults to 100000
     */
    async runTest({ testBody, gaslimit = "100000" }:
        { testBody: { [key: string]: string }, gaslimit?: string }) {
        try {
            const res = await fetch(`${this.host}/contract/call`, {
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

export default ScillaServer;