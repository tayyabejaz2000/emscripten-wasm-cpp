import a from"module-wasm/module";import"!!file-loader?name=wasm/module.wasm!./module.wasm";export async function LoadWASM(){const m=await fetch("wasm/module.wasm");return a({wasmBinary:new Uint8Array(await m.arrayBuffer())})}