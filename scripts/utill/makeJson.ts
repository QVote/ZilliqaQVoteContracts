import { setValForParams, Params, ValueParams } from './utill'

function blockchainJson(BnumVal: string) {
    return [
        {
            "vname": "BLOCKNUMBER",
            "type": "BNum",
            "value": BnumVal
        }
    ]
}

function initJson(params: Params, stringVal: string,
    listStringVal: string[], int32Val: string, BnumVal: string, byStr20Val: string) {
    return [
        {
            "vname": "_scilla_version",
            "type": "Uint32",
            "value": "0"
        },
        {
            "vname": "_this_address",
            "type": "ByStr20",
            "value": "0xabfeccdc9012345678901234567890f777567890"
        },
        {
            "vname": "_creation_block",
            "type": "BNum",
            "value": "1"
        },
        ...setValForParams(params, { stringVal, listStringVal, int32Val, BnumVal, byStr20Val })]
}

function outputJson() {
    return []
}

function messageJson(messageName: string, params: Params, _sender: string, _amount: string) {
    return {
        "_tag": messageName,
        "_amount": "0",
        "_sender": _sender,
        "params": params,
        "_origin": _sender
    }
}


function stateJson(params: ValueParams, _balance: string) {
    return [...params, {
        "vname": "_balance",
        "type": "Uint128",
        "value": _balance
    }];
}

export { blockchainJson, initJson, outputJson, messageJson, stateJson }