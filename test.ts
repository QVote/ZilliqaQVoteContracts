import { getContractCode, _dirs, _names, scillaServerUrl } from './config';
import { TestGenerator, ScillaServer } from './scillaTest';
import { testDecisionQueue } from './DecisionQueueTest';
import { testQVoting } from './QVotingTest';
import { resolve } from 'path';
import { check } from './utill';


const tg = new TestGenerator({
    testResultAbsolutePath: _dirs.testDir
})
const ss = new ScillaServer(scillaServerUrl);

(async () => {
    try {
        await check("DecisionQueue", getContractCode(
            resolve('../contract/DecisionQueue.scilla')),
            testDecisionQueue, ss, tg);
        await check("QVoting", getContractCode(
            resolve('../contract/QVoting.scilla')),
            testQVoting, ss, tg);
    } catch (e) {
        console.error(e);
    }
    console.info("Done!")
    process.exit()
})();