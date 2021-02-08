import { TestGenerator, ScillaServer } from "../scillaTest";
import { CheckerOutput } from '../scillaTest/types'
import { writeFile } from '../scillaTest/utill'

const FgRed = "\x1b[31m";
const FgGreen = "\x1b[32m";
const FgYellow = "\x1b[33m";
const Reset = "\x1b[0m";
export const RED = FgRed + "%s" + Reset;
export const GREEN = FgGreen + "%s" + Reset;
export const YELLOW = FgYellow + "%s" + Reset;

export type testingFunction = (
    tg: TestGenerator,
    code: string,
    checkerOutput: any,
    ss: ScillaServer,
) => Promise<void>

export function handleResult(testName: string, result: any, testBody: any, tg: TestGenerator) {
    testBody.code = "Removed Code";
    tg.write(testName, { ...testBody, result: result });
    console.info(`Test: ${testName}:`)
    console.log(result.result == "error" ? RED : GREEN, `result: ${result.result}`)
    if (result.result == 'error') {
        console.log(result.message);
    }
}

export async function runTest(name: string, testBody: any, ss: ScillaServer, tg: TestGenerator) {
    try {
        const result = await ss.runTest({ testBody });
        handleResult(name, result, testBody, tg);
    } catch (e) { throw e; }
}

export async function check(name: string, code: string, callback: testingFunction, ss: ScillaServer, tg: TestGenerator) {
    try {
        console.log(YELLOW, `Running ${name} tests...`)
        const res = await ss.check({
            contractCode: code,
        });
        console.log("Check:");
        console.log(res.result == 'success' ? GREEN : RED, `result: ${res.result}`)
        writeFile('out', `${name}/out`, 'json', res);
        if (typeof res.message != 'string') {
            const out = res.message!! as CheckerOutput;
            await callback(tg, code, out, ss);
        } else {
            console.error(res);
        }
    } catch (e) { throw e; }
}