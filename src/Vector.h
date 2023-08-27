#pragma once

#include <string>
#include "math.h"

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
public:
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
  Vector* Add(Vector* v);
  Vector* Sub(Vector* v);
  Vector* Mul(Vector* v);
  Vector* Div(Vector* v);
  Vector* Add(float val);
  Vector* Sub(float val);
  Vector* Mul(float val);
  Vector* Div(float val);

  Vector* Abs();
  Vector* Normalize();

  //TODO Rotate Vector By (Optional)
  Vector* RotateEuler(EulerRotation u);
  Vector* Rotate(AngleAxis u);
  Vector* RotateX(float angle);
  Vector* RotateY(float angle);
  Vector* RotateZ(float angle);

public:
  Vector* Normalized() const;
  float Magnitude() const;
  float Dist(Vector* v) const;

public:
  Vector* Copy();
  Point ToObject();
  std::string ToString();

public:
  static Vector* Make(float x = 0.0f, float y = 0.0f, float z = 0.0f);
  static const Vector* const MakeConst(float x = 0.0f, float y = 0.0f, float z = 0.0f);
  static Vector* Midpoint(Vector* a, Vector* b);
};