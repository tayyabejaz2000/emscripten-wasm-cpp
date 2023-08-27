#include "Vector.h"

#include <emscripten/emscripten.h>
#include <emscripten/bind.h>

using namespace emscripten;

typedef Vector* (Vector::* VectorOpFn)(Vector*);
typedef Vector* (Vector::* FloatOpFn)(float);

EMSCRIPTEN_BINDINGS(Vector)
{
  class_<Vector>("Vector")
    .constructor(&Vector::Make, allow_raw_pointers())
    .property("x", &Vector::GetX, &Vector::SetX)
    .property("y", &Vector::GetY, &Vector::SetY)
    .property("z", &Vector::GetZ, &Vector::SetZ)
    .function("Set", &Vector::Set)
    .function("Add", (VectorOpFn)&Vector::Add, allow_raw_pointers())
    .function("Sub", (VectorOpFn)&Vector::Sub, allow_raw_pointers())
    .function("Mul", (VectorOpFn)&Vector::Mul, allow_raw_pointers())
    .function("Div", (VectorOpFn)&Vector::Div, allow_raw_pointers())
    .function("AddVal", (FloatOpFn)&Vector::Add, allow_raw_pointers())
    .function("SubVal", (FloatOpFn)&Vector::Sub, allow_raw_pointers())
    .function("MulVal", (FloatOpFn)&Vector::Mul, allow_raw_pointers())
    .function("DivVal", (FloatOpFn)&Vector::Div, allow_raw_pointers())
    .function("Abs", &Vector::Abs, allow_raw_pointers())
    .function("Translate", (VectorOpFn)&Vector::Add, allow_raw_pointers())
    .function("RotateX", &Vector::RotateX, allow_raw_pointers())
    .function("RotateY", &Vector::RotateY, allow_raw_pointers())
    .function("RotateZ", &Vector::RotateZ, allow_raw_pointers())
    .function("Rotate", &Vector::Rotate, allow_raw_pointers())
    .function("RotateEuler", &Vector::RotateEuler, allow_raw_pointers())
    .function("Normalize", &Vector::Normalize, allow_raw_pointers())
    .function("Normalized", &Vector::Normalized, allow_raw_pointers())
    .function("Magnitude", &Vector::Magnitude)
    .function("Dist", &Vector::Dist, allow_raw_pointers())
    .function("Copy", &Vector::Copy, allow_raw_pointers())
    .function("ToString", &Vector::ToString)
    .function("ToObject", &Vector::ToObject)
    .class_function("Midpoint", &Vector::Midpoint, allow_raw_pointers())
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