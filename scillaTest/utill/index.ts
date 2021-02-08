import { writeFileSync } from 'fs';
import { Params, ValueField } from '../types';



function setValForParams(arr: Params,
    conf: { [key: string]: ValueField }) {
    return arr.map(param =>
    ({
        vname: param.vname,
        type: param.type,
        value: conf[param.type]
    }))
}

function resolvePath(dir: string, fileName: string, extension: string) {
    return `${dir}/${fileName}.${extension}`
}

function writeFile(dir: string, fileName: string, extension: string, fileJson: { [key: string]: any }) {
    writeFileSync(resolvePath(dir, fileName, extension), JSON.stringify(fileJson, null, "\t"));
}

export { setValForParams, writeFile };