import { testingFunction, runTest } from '../utill';


export const testQVoting: testingFunction = async (tg, code, checkerOutput, ss) => {
    try {
        const ownerAddress = "0x1234567890123456789012345678901234567890";
        const voterAddress1 = "0x5234567890123456789012345678901234567890";
        const voterAddress2 = "0x3234567890123456789012345678901234567890";
        const voterAddress3 = "0x2234567890123456789012345678901234567890";
        const voterAddress4 = "0x1244567890123456789012345678901234567890";
        const blockchain = tg.genBlockchain("100");
        const output = tg.genOutput();
        const emptyArr: any[] = [];
        const optionsArr = ["opt1", "opt2"];
        const init = tg.genInitFromRaw([{
            "vname": "owner",
            "type": "ByStr20",
            "value": ownerAddress
        },
        {
            "vname": "expiration_block",
            "type": "BNum",
            "value": "100000000"
        },
        {
            "vname": "name",
            "type": "String",
            "value": "test"
        },
        {
            "vname": "description",
            "type": "String",
            "value": "test"
        },
        {
            "vname": "options",
            "type": "List (String)",
            "value": optionsArr
        },
        {
            "vname": "token_to_credit_ratio",
            "type": "Int32",
            "value": "100"
        },
        {
            "vname": "registration_end_time",
            "type": "BNum",
            "value": "1000000"
        }]);

        await runTest("ownerRegisterShouldRegisterWithOwnerAsSender", tg.genTestBody(
            code,
            init,
            blockchain,
            output,
            tg.genMessage("owner_register", [
                tg.createValueParam("List (ByStr20)", "addresses", [ownerAddress, voterAddress1]),
                tg.createValueParam("List (Int32)", "credits", ["1000", "1000"]),
            ], ownerAddress, "0"),
            tg.genState([
                tg.createValueParam("Map (ByStr20) (Int32)", "voter_balances", emptyArr),
                tg.createValueParam("Map (String) (Int128)", "options_to_votes_map", emptyArr),
                tg.createValueParam("List (ByStr20)", "registered_voters", emptyArr),
            ], "0"),
        ),
            ss, tg);


    } catch (e) { throw e; }
}