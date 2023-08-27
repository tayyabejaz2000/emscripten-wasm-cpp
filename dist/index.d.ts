/// <reference types="emscripten" />

declare module "module-wasm";

export interface Vector {
  x: number;
  y: number;
  z: number;
  Add(_0: Vector): Vector;
  Sub(_0: Vector): Vector;
  Mul(_0: Vector): Vector;
  Div(_0: Vector): Vector;
  Abs(): Vector;
  Translate(_0: Vector): Vector;
  Normalize(): Vector;
  Normalized(): Vector;
  Copy(): Vector;
  Set(_0: number, _1: number, _2: number): void;
  AddVal(_0: number): Vector;
  SubVal(_0: number): Vector;
  MulVal(_0: number): Vector;
  DivVal(_0: number): Vector;
  RotateX(_0: number): Vector;
  RotateY(_0: number): Vector;
  RotateZ(_0: number): Vector;
  Magnitude(): number;
  Dist(_0: Vector): number;
  ToObject(): Point;
  Rotate(_0: AngleAxis): Vector;
  RotateEuler(_0: EulerRotation): Vector;
  ToString(): ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
  delete(): void;
}

export type Point = {
  x: number,
  y: number,
  z: number
};

export type AngleAxis = {
  x: number,
  y: number,
  z: number,
  angle: number
};

export type EulerRotation = {
  x: number,
  y: number,
  z: number
};

export interface MainModule extends EmscriptenModule {
  Vector: {new(_0: number, _1: number, _2: number): Vector; Midpoint(_0: Vector, _1: Vector): Vector};
}

export function LoadWASM(): Promise<MainModule>;