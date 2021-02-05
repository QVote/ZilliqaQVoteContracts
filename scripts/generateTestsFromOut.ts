import * as out from './out/out.json';
import {
    initJson, blockchainJson, outputJson,
    messageJson, stateJson, createValueParam, 
    writeFile, getFileName
} from './utill';


/*
need to generate: 
    init: makeTempFileName(id, 'json', 'init'),
    blockchain: makeTempFileName(id, 'json', 'blockchain'),
    output: makeTempFileName(id, 'json', 'output'),
*/
const ownerAddress = "0x1234567890123456789012345678901234567890";
const _BLOCKCHAIN_PREFIX = "blockchain";
const _INIT_PREFIX = "init";
const _OUTPUT_PREFIX = "output";
const _MESSAGE_PREFIX = "message";
const _STATE_PREFIX = "state";

(async () => {
    try {
        const fileNum = "1";
        const testDir = "./tests";
        const init = initJson(out.contract_info.params, "Test", ["opt1", "opt2"], "1000", "10000000000000", ownerAddress);
        writeFile(testDir, getFileName(_INIT_PREFIX, fileNum), "json", init);
        const blockchain = blockchainJson("100");
        writeFile(testDir, getFileName(_BLOCKCHAIN_PREFIX, fileNum), "json", blockchain);
        const output = outputJson();
        writeFile(testDir, getFileName(_OUTPUT_PREFIX, fileNum), "json", output);
        const message = messageJson("register", [], ownerAddress, "0");
        writeFile(testDir, getFileName(_MESSAGE_PREFIX, fileNum), "json", message);
        const param: any[] = [];
        const state = stateJson([
            createValueParam("Map (ByStr20) (Int32)", "voter_balances", param),
            createValueParam("Map (String) (Int128)", "options_to_votes_map", param)
        ], "0")
        writeFile(testDir, getFileName(_STATE_PREFIX, fileNum), "json", state);

    } catch (e) {
        console.error(e);
    }
})();