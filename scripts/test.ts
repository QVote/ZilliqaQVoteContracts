import ss from './ScillaServer';
import { CONTRACT_CODE, _dirs, _names } from './config';
import { createValueParam } from './utill';
import tg from './TestGenerator';

const ownerAddress = "0x1234567890123456789012345678901234567890";

function handleResult(testName: string, result: any, testBody: any) {
    testBody.code = "DontWantItInTheFileThx";
    tg.write(testName, { ...testBody, result: result });
    console.info(`Test: ${testName}: result: ${result.result}`)
}

(async () => {
    try {
        const res = await ss.check({ contractCode: CONTRACT_CODE });
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
                    createValueParam("Map (ByStr20) (Int32)", "voter_balances", emptyArr),
                    createValueParam("Map (String) (Int128)", "options_to_votes_map", emptyArr)
                ], "0"),
            );
            const result = await ss.runTest({ testBody });
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