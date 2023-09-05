#include "Vector.h"

#include <emscripten/emscripten.h>
#include <emscripten/bind.h>

using namespace emscripten;

typedef Vector* (Vector::* VectorOpFn)(Vector*);
typedef Vector* (Vector::* FloatOpFn)(float);

Vector* Passthrough(Vector* val, int x)
{
  return val;
}

EMSCRIPTEN_BINDINGS(Vector)
{
  class_<Vector>("Vector")
    .constructor(&Vector::Make, allow_raw_pointers())
    .property("x", &Vector::GetX, &Vector::SetX)
    .property("y", &Vector::GetY, &Vector::SetY)
    .property("z", &Vector::GetZ, &Vector::SetZ)
    .function("Set(x, y, z)", &Vector::Set)
    .function("Add(v)", (VectorOpFn)&Vector::Add, allow_raw_pointers())
    .function("Sub(v)", (VectorOpFn)&Vector::Sub, allow_raw_pointers())
    .function("Mul(v)", (VectorOpFn)&Vector::Mul, allow_raw_pointers())
    .function("Div(v)", (VectorOpFn)&Vector::Div, allow_raw_pointers())
    .function("AddVal(val)", (FloatOpFn)&Vector::Add, allow_raw_pointers())
    .function("SubVal(val)", (FloatOpFn)&Vector::Sub, allow_raw_pointers())
    .function("MulVal(val)", (FloatOpFn)&Vector::Mul, allow_raw_pointers())
    .function("DivVal(val)", (FloatOpFn)&Vector::Div, allow_raw_pointers())
    .function("Abs()", &Vector::Abs, allow_raw_pointers())
    .function("Translate(v)", (VectorOpFn)&Vector::Add, allow_raw_pointers())
    .function("RotateX(angle)", &Vector::RotateX, allow_raw_pointers())
    .function("RotateY(angle)", &Vector::RotateY, allow_raw_pointers())
    .function("RotateZ(angle)", &Vector::RotateZ, allow_raw_pointers())
    .function("Rotate(u)", &Vector::Rotate, allow_raw_pointers())
    .function("RotateEuler(u)", &Vector::RotateEuler, allow_raw_pointers())
    .function("Normalize()", &Vector::Normalize, allow_raw_pointers())
    .function("Normalized()", &Vector::Normalized, allow_raw_pointers())
    .function("Magnitude()", &Vector::Magnitude)
    .function("Dist(v)", &Vector::Dist, allow_raw_pointers())
    .function("Copy()", &Vector::Copy, allow_raw_pointers())
    .function("ToString()", &Vector::ToString)
    .function("ToObject()", &Vector::ToObject)
    .function("Passthrough", &Passthrough, allow_raw_pointers())
    .class_function("Midpoint(a, b)", &Vector::Midpoint, allow_raw_pointers())
    ;
}

EMSCRIPTEN_BINDINGS(Objects)
{
  value_object<Point>("Point")
    .field("x", &Point::x)
    .field("y", &Point::y)
    .field("z", &Point::z)
    ;

  value_object<AngleAxis>("AngleAxis")
    .field("x", &AngleAxis::x)
    .field("y", &AngleAxis::y)
    .field("z", &AngleAxis::z)
    .field("angle", &AngleAxis::angle)
    ;

  value_object<EulerRotation>("EulerRotation")
    .field("x", &EulerRotation::x)
    .field("y", &EulerRotation::y)
    .field("z", &EulerRotation::z)
    ;
}