import { resolve } from 'path';
import { exec } from 'shelljs';

const getResultLine = (str) => {
  return str.replace(/Zkbas Crypto Assembly/gi, '').trim();
};

const wasmExec = (func, funcArgs) => {
  // ['seed phrase', 'hello world'] => '"seed phrase" "hee world"'
  const args = funcArgs
    .map((arg) => {
      return "'" + arg + "'";
    })
    .join(' ');

  const wasmExecNodePath = resolve(__dirname, './wasm_exec_node.js');
  const wasmFilePath = resolve(__dirname, './main.wasm');

  const result = exec(`node ${wasmExecNodePath} ${wasmFilePath} ${func} ${args}`, {
    silent: true,
  });

  return getResultLine(result.stdout);
};

const getEddsaPublicKey = (seed) => wasmExec('getEddsaPublicKey', [seed]);

const generateEddsaKey = (seed) => wasmExec('generateEddsaKey', [seed]);

const getEddsaCompressedPublicKey = (seed) => wasmExec('getEddsaCompressedPublicKey', [seed]);

const eddsaSign = (seed, message) => wasmExec('eddsaSign', [seed, message]);

const eddsaVerify = (publicKey, signature, message) => wasmExec('eddsaVerify', [publicKey, signature, message]);

const signAddLiquidity = (seed, segmentstr) => wasmExec('signAddLiquidity', [seed, segmentstr]);

const signRemoveLiquidity = (seed, segmentstr) => wasmExec('signRemoveLiquidity', [seed, segmentstr]);

const signSwap = (seed, segmentstr) => wasmExec('signSwap', [seed, segmentstr]);

const signTransfer = (seed, segmentstr) => wasmExec('signTransfer', [seed, segmentstr]);

const signWithdraw = (seed, segmentstr) => wasmExec('signWithdraw', [seed, segmentstr]);

const signOffer = (seed, segmentstr) => wasmExec('signOffer', [seed, segmentstr]);

const signAtomicMatch = (seed, segmentstr) => wasmExec('signAtomicMatch', [seed, segmentstr]);

const signCancelOffer = (seed, segmentstr) => wasmExec('signCancelOffer', [seed, segmentstr]);

const signCreateCollection = (seed, segmentstr) => wasmExec('signCreateCollection', [seed, segmentstr]);

const signMintNft = (seed, segmentstr) => wasmExec('signMintNft', [seed, segmentstr]);

const signTransferNft = (seed, segmentstr) => wasmExec('signTransferNft', [seed, segmentstr]);

const signWithdrawNft = (seed, segmentstr) => wasmExec('signWithdrawNft', [seed, segmentstr]);

export const ZkCrypto = {
  getEddsaPublicKey,
  getEddsaCompressedPublicKey,
  generateEddsaKey,
  eddsaSign,
  eddsaVerify,
  signAddLiquidity,
  signRemoveLiquidity,
  signSwap,
  signTransfer,
  signWithdraw,
  signOffer,
  signAtomicMatch,
  signCancelOffer,
  signCreateCollection,
  signMintNft,
  signTransferNft,
  signWithdrawNft,
};