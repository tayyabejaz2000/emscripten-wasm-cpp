#pragma once

#include "vectorization.h"

struct AngleAxis
{
  union
  {
    float4 vec;
    struct
    {
      float x;
      float y;
      float z;
      float angle;
    };
  };
};

struct Point
{
  union
  {
    float4 vec;
    struct
    {
      float x;
      float y;
      float z;
    };
  };
};

struct EulerRotation
{
  union
  {
    float4 vec;
    struct
    {
      float x;
      float y;
      float z;
    };
  };
};

class Vector
{
  union
  {
    float4 vec;
    struct
    {
      float x;
      float y;
      float z;
      float w;
    };
  };

private:
  Vector(float x, float y, float z) : x(x), y(y), z(z), w(0.0f) {};
  Vector(float4 vec) : vec(vec) {};

public:
  float GetX() const { return this->x; }
  float GetY() const { return this->y; }
  float GetZ() const { return this->z; }
  float GetW() const { return this->w; }
  void SetX(float value) { this->x = value; }
  void SetY(float value) { this->y = value; }
  void SetZ(float value) { this->z = value; }
  void SetW(float value) { this->w = value; }
  void Set(float x, float y, float z) { this->x = x, this->y = y, this->z = z; }

public:
  Vector& Add(const Vector& v);
  Vector& Sub(const Vector& v);
  Vector& Mul(const Vector& v);
  Vector& Div(const Vector& v);
  Vector& AddVal(float val);
  Vector& SubVal(float val);
  Vector& MulVal(float val);
  Vector& DivVal(float val);

  Vector& Abs();
  Vector& Normalize();

  Vector& RotateEuler(const EulerRotation& u);
  Vector& Rotate(const AngleAxis& u);
  Vector& RotateX(float angle);
  Vector& RotateY(float angle);
  Vector& RotateZ(float angle);

public:
  Vector Normalized() const;

public:
  float Magnitude() const;
  float Dist(const Vector& v) const;

public:
  Vector Copy();

public:
  static Vector Make(float x = 0.0f, float y = 0.0f, float z = 0.0f);
  static Vector Midpoint(const Vector a, const Vector b);
};