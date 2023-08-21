import Module, { MainModule } from './module';
import '!!file-loader?name=wasm/module.wasm!./module.wasm';
export async function LoadWASM(): Promise<MainModule> {
  const wasmFile = await fetch('wasm/module.wasm');
  return (<any>Module)({
    wasmBinary: new Uint8Array(await wasmFile.arrayBuffer()),
  });
}