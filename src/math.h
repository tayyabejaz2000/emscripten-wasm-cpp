#pragma once

#include <numbers>

#define FORCE_INLINE inline __attribute__((always_inline))

typedef float float4 __attribute__((ext_vector_type(4)));

static constexpr auto PI = std::numbers::pi_v<long double>;
static constexpr auto DEG2RAD = PI / 180.0l;
static constexpr auto RAD2DEG = 180.0l / PI;

FORCE_INLINE float hadd(float4 vec)
{
    const auto s = vec.xy + vec.zy;
    return s.x + s.y;
}

#undef FORCE_INLINE