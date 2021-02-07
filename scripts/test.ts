import { getContractCode, _dirs, _names, scillaServerUrl } from './config';
import { TestGenerator, ScillaServer } from './scillaTest';
import { testDecisionQueue } from './DecisionQueueTest';
import { resolve } from 'path';
import { CheckerOutput } from './scillaTest/types'
import { writeFile } from './scillaTest/utill'


const tg = new TestGenerator({
    testResultAbsolutePath: _dirs.testDir
})
const ss = new ScillaServer(scillaServerUrl);

(async () => {
    try {
        await check("DecisionQueue", getContractCode(
            resolve('../contract/DecisionQueue.scilla')),
            testDecisionQueue);
    } catch (e) {
        console.error(e);
    }
    console.info("Done!")
    process.exit()
})();



async function check(name: string, code: string,
    callback: (tg: TestGenerator, code: string, checkerOutput: CheckerOutput, ss: ScillaServer) => Promise<any>
) {
    try {
        console.log(`Running ${name} tests...`)
        const res = await ss.check({
            contractCode: code,
        });
        console.log("Check result: ", res);
        writeFile('out', 'DecisionQueue/out', 'json', res);
        if (typeof res.message != 'string') {
            const out = res.message!! as CheckerOutput;
            await callback(tg, code, out, ss);
        } else {
            console.error(res);
        }
    } catch (e) { throw e; }
}