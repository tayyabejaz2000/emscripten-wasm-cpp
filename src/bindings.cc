#include "Vector.h"

#include "emscripten/emscripten.h"
#include "emscripten/bind.h"

using namespace emscripten;

EMSCRIPTEN_BINDINGS(Vector)
{
  value_object<Vector>("Vector")
    .field("x", &Vector::x)
    .field("y", &Vector::y)
    .field("z", &Vector::z)
    ;

  function("Add", &Add);
}
