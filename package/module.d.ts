/// <reference types="emscripten" />

export type Vector = {
  x: number,
  y: number,
  z: number
};

export interface MainModule extends EmscriptenModule {
  Add(_0: Vector, _1: Vector): Vector;
}
