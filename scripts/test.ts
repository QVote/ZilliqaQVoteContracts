import { CONTRACT_CODE, _dirs, _names, scillaServerUrl } from './config';
import { TestGenerator, ScillaServer } from './scillaTest';

const ownerAddress = "0x1234567890123456789012345678901234567890";

const tg = new TestGenerator({
    testResultAbsolutePath: _dirs.testDir
})
const ss = new ScillaServer();

function handleResult(testName: string, result: any, testBody: any) {
    testBody.code = "Removed Code";
    tg.write(testName, { ...testBody, result: result });
    console.info(`Test: ${testName}: result: ${result.result}`)
}

(async () => {
    try {
        const res = await ss.check({
            contractCode: CONTRACT_CODE,
            ssUrlEndpoint: `${scillaServerUrl}/contract/check`
        });
        if (typeof res.message != 'string') {
            const out = res.message;
            const emptyArr: any[] = [];
            /**
             * Test contract register voter
             */
            const testBody = tg.genTestBody(
                CONTRACT_CODE,
                tg.genInit(out.contract_info.params, "Test", ["opt1", "opt2"], "1000", "10000000000000", ownerAddress),
                tg.genBlockchain("100"),
                tg.genOutput(),
                tg.genMessage("register", [], ownerAddress, "0"),
                tg.genState([
                    tg.createValueParam("Map (ByStr20) (Int32)", "voter_balances", emptyArr),
                    tg.createValueParam("Map (String) (Int128)", "options_to_votes_map", emptyArr)
                ], "0"),
            );
            const result = await ss.runTest({ testBody, ssUrlEndpoint: `${scillaServerUrl}/contract/call` });
            handleResult("registerVoter", result, testBody);
            /**
             * End test
             */
        } else {
            console.error(res);
        }
    } catch (e) {
        console.error(e);
    }
    console.info("Done!")
    process.exit()
})();