import fetch from 'node-fetch';


class ScillaServer {
    /**
        @param ssUrlEndpoint scilla server endpoint url ex https://localhost:4000/contract/check
        @param contractCode code of the .scilla contract
    */
    async check({ ssUrlEndpoint, contractCode }:
        { ssUrlEndpoint: string, contractCode: string }) {
        try {
            const res = await fetch(ssUrlEndpoint, {
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
     * @param ssUrlEndpoint scilla server endpoint url ex https://localhost:4000/contract/call
     * @param testBody body of the test to send
     * @param gaslimit defaults to 100000
     */
    async runTest({ ssUrlEndpoint, testBody, gaslimit = "100000" }:
        { ssUrlEndpoint: string, testBody: { [key: string]: string }, gaslimit?: string }) {
        try {
            const res = await fetch(ssUrlEndpoint, {
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