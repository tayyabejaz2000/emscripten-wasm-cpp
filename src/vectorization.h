#define FORCE_INLINE inline __attribute__((always_inline))

typedef float float4 __attribute__((ext_vector_type(4)));

FORCE_INLINE float cumsum(float4 vec)
{
    const auto s = vec.xy + vec.zy;
    return s.x + s.y;
}

#undef FORCE_INLINE