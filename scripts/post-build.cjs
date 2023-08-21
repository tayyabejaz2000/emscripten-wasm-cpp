const fs = require("fs");

if (process.argv.length < 3)
    exit(-1);

const typingsFile = process.argv[2];

let data = fs.readFileSync(typingsFile).toString();

if (!data.includes("EmscriptenModule")) {
    data = `/// <reference types="emscripten" />\n\n` + data.replace("MainModule", "MainModule extends EmscriptenModule");
    fs.writeFileSync(typingsFile, data);
}

const loader = `import Module, { MainModule } from './module';
import '!!file-loader?name=wasm/module.wasm!./module.wasm';

export async function LoadWASM() {
  const wasmFile = await fetch('wasm/module.wasm');
  const buffer = await wasmFile.arrayBuffer();
  const moduleArgs = {
    wasmBinary: new Uint8Array(buffer),
  };

  const module: Promise<MainModule> = (Module as any)(moduleArgs);
  module.then((m) => {
    console.log(m);
  });
}
`
fs.writeFileSync("bin/loader.ts", loader);