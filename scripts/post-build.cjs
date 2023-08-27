if (process.argv.length < 4)
  process.exit(-1);

const fs = require("fs");

const buildDir = process.argv[2];
const moduleName = process.argv[3];

const distDir = "dist";
if (fs.existsSync(distDir)) fs.rmSync(distDir, { recursive: true, force: true })
fs.mkdirSync(distDir);

const wasmFile = `${buildDir}/${moduleName}.wasm`;
const bindingFile = `${buildDir}/${moduleName}.js`
const typingsFile = `${buildDir}/index.d.ts`;

let data = fs.readFileSync(typingsFile).toString();

if (!data.includes("EmscriptenModule")) {
  data = `/// <reference types="emscripten" />\n\ndeclare module "module-wasm";\n\n` + data.replace("MainModule", "MainModule extends EmscriptenModule") + "\nexport function LoadWASM(): Promise<MainModule>;";
  fs.writeFileSync(typingsFile, data);
}

fs.copyFileSync(wasmFile, `${distDir}/${moduleName}.wasm`)
fs.copyFileSync(bindingFile, `${distDir}/${moduleName}.js`)
fs.copyFileSync(typingsFile, `${distDir}/index.d.ts`)

const loader = `import a from"module-wasm/module";import"!!file-loader?name=wasm/module.wasm!./module.wasm";export async function LoadWASM(){const m=await fetch("wasm/module.wasm");return a({wasmBinary:new Uint8Array(await m.arrayBuffer())})}`

const packageJson = `{
  "name": "module-wasm",
  "version": "0.0.1",
  "description": "WASM Module for WEBGL",
  "devDependencies": {
    "@types/emscripten": "^1.39.7",
    "file-loader": "^6.2.0",
    "typescript": "^5.1.6"
  }
}`;

fs.writeFileSync(`${distDir}/index.js`, loader);
fs.writeFileSync(`${distDir}/package.json`, packageJson);