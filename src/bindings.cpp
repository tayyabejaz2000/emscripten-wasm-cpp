#include "Vector.h"

#include "emscripten/emscripten.h"
#include "emscripten/bind.h"

using namespace emscripten;

EMSCRIPTEN_BINDINGS(Vector)
{
  class_<Vector>("Vector")
    .constructor(&Vector::Make)
    .property("x", &Vector::GetX, &Vector::SetX)
    .property("y", &Vector::GetY, &Vector::SetY)
    .property("z", &Vector::GetZ, &Vector::SetZ)
    .function("Set", &Vector::Set)
    .function("Add", &Vector::Add)
    .function("Sub", &Vector::Sub)
    .function("Mul", &Vector::Mul)
    .function("Div", &Vector::Div)
    .function("AddVal", &Vector::AddVal)
    .function("SubVal", &Vector::SubVal)
    .function("MulVal", &Vector::MulVal)
    .function("DivVal", &Vector::DivVal)
    .function("Abs", &Vector::Abs)
    .function("Translate", &Vector::Add)
    .function("RotateX", &Vector::RotateX)
    .function("RotateY", &Vector::RotateY)
    .function("RotateZ", &Vector::RotateZ)
    .function("Rotate", &Vector::Rotate)
    .function("RotateEuler", &Vector::RotateEuler)
    .function("Normalize", &Vector::Normalize)
    .function("Normalized", &Vector::Normalized)
    .function("Magnitude", &Vector::Magnitude)
    .function("Dist", &Vector::Dist)
    .function("Copy", &Vector::Copy)
    .class_function("Midpoint", &Vector::Midpoint)
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
