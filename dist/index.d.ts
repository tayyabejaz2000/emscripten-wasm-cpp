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

export interface Transform {
  GetPosition(): Vector;
  GetLocalPosition(): Vector;
  GetSize(): Vector;
  TranslateLocal(InVec: Vector): Vector;
  TranslateWorld(InVec: Vector): Vector;
  RotateLocal(InVec: Vector): Vector;
  RotateWorld(InVec: Vector): Vector;
  TransformLocal(InVec: Vector): Vector;
  TransformWorld(InVec: Vector): Vector;
  SetParent(InParent: Transform): void;
  AddChild(InChild: Transform): void;
  RemoveChild(InChild: Transform): void;
  GetRotation(): number;
  GetRadianRotation(): number;
  GetLocalRotation(): number;
  GetLocalRadianRotation(): number;
  MoveTo(x: number, y: number, z: number): void;
  MoveOffset(deltaX: number, deltaY: number, deltaZ: number): void;
  RotateTo(angle: number): void;
  RotateOffset(angle: number): void;
  SetSize(width: number, height: number): void;
  SetSizeOffset(deltaW: number, deltaH: number): void;
  SetWidth(width: number, lockAspectRatio: boolean): void;
  SetHeight(height: number, lockAspectRatio: boolean): void;
  SetWidthOffset(deltaW: number, lockAspectRatio: boolean): void;
  SetHeightOffset(deltaH: number, lockAspectRatio: boolean): void;
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
  Vector: {new(_0: number, _1: number, _2: number): Vector; Midpoint(a: Vector, b: Vector): Vector; None(): Vector};
  Transform: {new(_0: Transform): Transform; None(): Transform};
}

export function LoadWASM(): Promise<MainModule>;