#pragma once

#include <memory>
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

protected:
  std::weak_ptr<Vector> SharedRef;

public:
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
  std::shared_ptr<Vector> Add(const std::shared_ptr<Vector>& v);
  std::shared_ptr<Vector> Sub(const std::shared_ptr<Vector>& v);
  std::shared_ptr<Vector> Mul(const std::shared_ptr<Vector>& v);
  std::shared_ptr<Vector> Div(const std::shared_ptr<Vector>& v);
  std::shared_ptr<Vector> AddVal(float val);
  std::shared_ptr<Vector> SubVal(float val);
  std::shared_ptr<Vector> MulVal(float val);
  std::shared_ptr<Vector> DivVal(float val);

  std::shared_ptr<Vector> Abs();
  std::shared_ptr<Vector> Normalize();

  std::shared_ptr<Vector> RotateEuler(const EulerRotation& u);
  std::shared_ptr<Vector> Rotate(const AngleAxis& u);
  std::shared_ptr<Vector> RotateX(float angle);
  std::shared_ptr<Vector> RotateY(float angle);
  std::shared_ptr<Vector> RotateZ(float angle);

public:
  std::shared_ptr<Vector> Normalized() const;
  float Magnitude() const;
  float Dist(const std::shared_ptr<Vector>& v) const;

public:
  std::shared_ptr<Vector> Copy();

public:
  static std::shared_ptr<Vector> Make(float x = 0.0f, float y = 0.0f, float z = 0.0f);
  static std::shared_ptr<Vector> Midpoint(const std::shared_ptr<Vector>& a, const std::shared_ptr<Vector>& b);
};