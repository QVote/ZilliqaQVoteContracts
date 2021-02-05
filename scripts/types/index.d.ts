//this is relevant to QVoting contract not ANY contract ex: procedures field
export type CheckerOutput = {
    "cashflow_tags": {
        "State variables": { "field": string, "tag": string }[],
        "ADT constructors": any[]
    },
    "contract_info": {
        "scilla_major_version": string,
        "vname": string,
        "params": { "vname": string, "type": string }[],
        "fields": {
            "vname": string,
            "type": string,
            "depth": number
        }[],
        "transitions": { "vname": string, "params": { "vname": string, "type": string }[] }[],
        "procedures": any[],
        "events": {
            "vname": string,
            "params": { "vname": string, "type": string }[]
        }[],
        "ADTs": any //dont care
    },
    "warnings": any, //dont care again
    "gas_remaining": string
}

