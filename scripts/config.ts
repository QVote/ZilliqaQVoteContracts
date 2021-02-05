import { readFileSync } from 'fs';
import { bytes } from '@zilliqa-js/util';

const contractRelativeDir = '../contract/QVoting.scilla';
const CONTRACT_CODE = readFileSync(contractRelativeDir, 'utf-8');
const scillaServerUrl = "http://localhost:4000";
const faucetUrl = "http://localhost:5556/request-funds";
const zilliqaBlockchainUrl = 'http://localhost:5555';
const checkerOutputJson = './out/out.json';

// These are set by the core protocol, and may vary per-chain.
// You can manually pack the bytes according to chain id and msg version.
// For more information: https://apidocs.zilliqa.com/?shell#getnetworkid

const chainId = 333; // chainId of the developer testnet
const msgVersion = 1; // current msgVersion
const VERSION = bytes.pack(chainId, msgVersion)


export { contractRelativeDir, scillaServerUrl, CONTRACT_CODE, faucetUrl, zilliqaBlockchainUrl, VERSION, checkerOutputJson };