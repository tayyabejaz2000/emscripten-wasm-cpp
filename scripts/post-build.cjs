const fs = require("fs");

if (process.argv.length < 4)
  process.exit(-1);

const buildDir = process.argv[2];
const moduleName = process.argv[3];

const packageDir = "package";

const wasmFile = `${buildDir}/${moduleName}.wasm`;
const bindingFile = `${buildDir}/${moduleName}.js`
const typingsFile = `${buildDir}/${moduleName}.d.ts`;

let data = fs.readFileSync(typingsFile).toString();

if (!data.includes("EmscriptenModule")) {
  data = `/// <reference types="emscripten" />\n\n` + data.replace("MainModule", "MainModule extends EmscriptenModule");
  fs.writeFileSync(typingsFile, data);
}

fs.copyFileSync(wasmFile, `${packageDir}/${moduleName}.wasm`)
fs.copyFileSync(bindingFile, `${packageDir}/${moduleName}.js`)
fs.copyFileSync(typingsFile, `${packageDir}/${moduleName}.d.ts`)

const loader = `import Module, { MainModule } from './module';
import '!!file-loader?name=wasm/module.wasm!./module.wasm';
export async function LoadWASM(): Promise<MainModule> {
  const wasmFile = await fetch('wasm/module.wasm');
  return (<any>Module)({
    wasmBinary: new Uint8Array(await wasmFile.arrayBuffer()),
  });
}`

fs.writeFileSync(`${packageDir}/index.ts`, loader);