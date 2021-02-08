import { TestGenerator, ScillaServer } from "../scillaTest";


export type testingFunction = (
    tg: TestGenerator,
    code: string,
    checkerOutput: any,
    ss: ScillaServer,
) => Promise<void>

export function handleResult(testName: string, result: any, testBody: any, tg: TestGenerator) {
    testBody.code = "Removed Code";
    tg.write(testName, { ...testBody, result: result });
    console.info(`Test: ${testName}: result: ${result.result}`)
    if (result.result == 'error') {
        console.log(result.message);
    }
}