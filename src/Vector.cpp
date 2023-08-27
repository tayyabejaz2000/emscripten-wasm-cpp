#include "Vector.h"

#include <cmath>
#include <format>
#include "wasm_simd128.h"

Vector* Vector::Make(float x, float y, float z)
{
    return new Vector(x, y, z);
}

Vector* Vector::Add(Vector* v)
{
    this->vec += v->vec;
    return this;
}

Vector* Vector::Sub(Vector* v)
{
    this->vec -= v->vec;
    return this;
}

Vector* Vector::Mul(Vector* v)
{
    this->vec *= v->vec;
    return this;
}

Vector* Vector::Div(Vector* v)
{
    this->vec /= v->vec;
    return this;
}

Vector* Vector::Add(float val)
{
    this->vec += val;
    return this;
}

Vector* Vector::Sub(float val)
{
    this->vec -= val;
    return this;
}

Vector* Vector::Mul(float val)
{
    this->vec *= val;
    return this;
}

Vector* Vector::Div(float val)
{
    this->vec /= val;
    return this;
}

Vector* Vector::Abs()
{
    this->vec = wasm_f32x4_abs(this->vec);
    return this;
}

Vector* Vector::Normalize()
{
    this->vec /= this->Magnitude();
    return this;
}

Vector* Vector::RotateEuler(const EulerRotation& u)
{
    const float sa = sin(u.x), sb = sin(u.y), sy = sin(u.z);
    const float ca = cos(u.x), cb = cos(u.y), cy = cos(u.z);
    this->x = cumsum(this->vec * float4{ (cb * cy), (sa * sb * cy - ca * sy), (ca * sb * cy + sa * sy), (0.0f) });
    this->y = cumsum(this->vec * float4{ (cb * sy), (sa * sb * sy + ca * cy), (ca * sb * sy - sa * cy), (0.0f) });
    this->z = cumsum(this->vec * float4{ (-sb), (sa * cb), (ca * cb), (0.0f) });
    return this;
}
Vector* Vector::Rotate(const AngleAxis& u)
{
    const float s = sin(u.angle), c = cos(u.angle);
    const float c1 = 1 - c;
    const float p1 = u.x * u.y * c1, p2 = u.z * s;
    const float q1 = u.x * u.z * c1, q2 = u.y * s;
    const float r1 = u.y * u.z * c1, r2 = u.x * s;
    this->x = cumsum(this->vec * float4{ (c + u.x * u.x * c1), (p1 - p2), (q1 + q2), (0.0f) });
    this->y = cumsum(this->vec * float4{ (p1 + p2), (c + u.y * u.y * c1), (r1 - r2), (0.0f) });
    this->z = cumsum(this->vec * float4{ (q1 - q2), (r1 + r2), (c + u.z * u.z * c1), (0.0f) });
    return this;
}

Vector* Vector::RotateX(float angle)
{
    const float s = sin(angle);
    const float c = cos(angle);
    this->y = this->y * c - this->z * s;
    this->z = this->y * s + this->z * c;
    return this;
}

Vector* Vector::RotateY(float angle)
{
    const float s = sin(angle);
    const float c = cos(angle);
    this->x = this->x * c - this->z * s;
    this->z = -this->x * s + this->z * c;
    return this;
}

Vector* Vector::RotateZ(float angle)
{
    const float s = sin(angle);
    const float c = cos(angle);
    this->x = this->x * c - this->y * s;
    this->y = this->x * s + this->y * c;
    return this;
}

Vector* Vector::Normalized() const
{
    return new Vector(this->vec / this->Magnitude());
}

float Vector::Magnitude() const
{
    return sqrt(cumsum(this->vec * this->vec));
}

float Vector::Dist(Vector* v) const
{
    const auto sub = this->vec - v->vec;
    return sqrt(cumsum(sub * sub));
}

Vector* Vector::Copy()
{
    return new Vector(this->vec);
}

Point Vector::ToObject()
{
    return Point{ this->vec };
}

std::string Vector::ToString()
{
    return "Vector{"
        + std::to_string(this->x) + ", "
        + std::to_string(this->x) + ", "
        + std::to_string(this->x) + "}";
}

Vector* Vector::Midpoint(Vector* a, Vector* b)
{
    return new Vector((a->vec + b->vec) / 2);
}