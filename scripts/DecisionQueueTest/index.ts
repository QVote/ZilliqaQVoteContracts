import { handleResult, testingFunction } from '../utill';


export const testDecisionQueue: testingFunction = async (tg, code, checkerOutput, ss) => {
    try {
        const ownerAddress = "0x1234567890123456789012345678901234567890";
        const blockchain = tg.genBlockchain("100");
        const output = tg.genOutput();
        const emptyArr: any[] = [];
        const init = tg.genInit(checkerOutput.contract_info.params, {
            "ByStr20": ownerAddress,
            "Bool": { "constructor": "True", "argtypes": [], "arguments": [] },
            "Uint32": "3"
        });
        const message = tg.genMessage("pushToQueue", [
            tg.createValueParam("ByStr20", "addr", ownerAddress),
        ], ownerAddress, "0");


        const testBody1 = tg.genTestBody(
            code,
            init,
            blockchain,
            output,
            message,
            tg.genState([
                tg.createValueParam("List (ByStr20)", "queue", emptyArr),
            ], "0"),
        );
        await runTest("pushToQueueShouldPush", testBody1);


        const testBody2 = tg.genTestBody(
            code,
            init,
            blockchain,
            output,
            message,
            tg.genState([
                tg.createValueParam("List (ByStr20)", "queue", [ownerAddress]),
            ], "0"),
        );
        await runTest("pushToQueueShouldReject", testBody2);


        const testBody3 = tg.genTestBody(
            code,
            init,
            blockchain,
            output,
            tg.genMessage("pushToQueue", [
                tg.createValueParam("ByStr20", "addr", "0x2231567890123456789012345678901234567890"),
            ], ownerAddress, "0"),
            tg.genState([
                tg.createValueParam("List (ByStr20)", "queue", [ownerAddress, "0x2234567890123456789012345678901234567890", "0x3234567890123456789012345678901234567890"]),
            ], "0"),
        );
        await runTest("pushToQueueShouldDequeueAndPush", testBody3);


    } catch (e) { throw e; }

    async function runTest(name: string, testBody: any) {
        try {
            const result = await ss.runTest({ testBody });
            handleResult(name, result, testBody, tg);
        } catch (e) { throw e; }
    }
}