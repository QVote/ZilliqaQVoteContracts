import { writeFileSync } from 'fs';
import { Params } from '../types';



function setValForParams(arr: Params,
    { stringVal = "",
        listStringVal = [],
        listInt128Val = [],
        int32Val = "",
        bNumVal = "",
        byStr20Val = ""
    }: {
        stringVal?: string,
        listStringVal?: string[],
        listInt128Val?: string[],
        int32Val?: string,
        bNumVal?: string,
        byStr20Val?: string
    }) {
    return arr.map(param => {
        let value: string | string[] = "";
        switch (param.type) {
            case "ByStr20":
                value = byStr20Val;
                break;
            case "BNum":
                value = bNumVal;
                break;
            case "Int32":
                value = int32Val;
                break;
            case "String":
                value = stringVal;
                break;
            case "List (String)":
                value = listStringVal;
                break;
            case "List (Int128)":
                value = listInt128Val;
                break;
        }
        return { ...param, value }
    })
}

function resolvePath(dir: string, fileName: string, extension: string) {
    return `${dir}/${fileName}.${extension}`
}

function writeFile(dir: string, fileName: string, extension: string, fileJson: { [key: string]: any }) {
    writeFileSync(resolvePath(dir, fileName, extension), JSON.stringify(fileJson, null, "\t"));
}

export { setValForParams, writeFile };