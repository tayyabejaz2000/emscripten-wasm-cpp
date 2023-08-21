#pragma once

#include <wasm_simd128.h>

struct Vector
{
  union
  {
    v128_t __simd_v;
    struct
    {
      float x;
      float y;
      float z;
      float a;
    };
  };
};

Vector Add(const Vector& a, const Vector& b)
{
  return Vector{ wasm_f32x4_add(a.__simd_v, b.__simd_v) };
}
