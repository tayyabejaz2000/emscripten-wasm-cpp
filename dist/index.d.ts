/// <reference types="emscripten" />

declare module "module-wasm";

export interface Vector {
  x: number;
  y: number;
  z: number;
  Add(v: Vector): Vector;
  Sub(v: Vector): Vector;
  Mul(v: Vector): Vector;
  Div(v: Vector): Vector;
  Abs(): Vector;
  Translate(v: Vector): Vector;
  Normalize(): Vector;
  Normalized(): Vector;
  Copy(): Vector;
  Passthrough(_0: number): Vector;
  Set(x: number, y: number, z: number): void;
  AddVal(val: number): Vector;
  SubVal(val: number): Vector;
  MulVal(val: number): Vector;
  DivVal(val: number): Vector;
  RotateX(angle: number): Vector;
  RotateY(angle: number): Vector;
  RotateZ(angle: number): Vector;
  Magnitude(): number;
  Dist(v: Vector): number;
  ToObject(): Point;
  Rotate(u: AngleAxis): Vector;
  RotateEuler(u: EulerRotation): Vector;
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
  Vector: {new(_0: number, _1: number, _2: number): Vector; Midpoint(a: Vector, b: Vector): Vector};
}

export function LoadWASM(): Promise<MainModule>;