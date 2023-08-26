/// <reference types="emscripten" />

declare module "module-wasm";

export type Vector = {
  x: number,
  y: number,
  z: number
};

export interface MainModule extends EmscriptenModule {
  Add(_0: Vector, _1: Vector): Vector;
}

export function LoadWASM(): Promise<MainModule>;