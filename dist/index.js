import Module from 'module-wasm/module';
import '!!file-loader?name=wasm/module.wasm!./module.wasm';
export async function LoadWASM() {
  const wasmFile = await fetch('wasm/module.wasm');
  return Module({
    wasmBinary: new Uint8Array(await wasmFile.arrayBuffer()),
  });
}