cmake_minimum_required(VERSION 3.27)

project(wasm)

add_definitions(-std=c++17)
set (CMAKE_CXX_STANDARD 17)

set(BUILD_DIR bin)

set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/${BUILD_DIR})
set(EXECUTABLE_OUTPUT_PATH ${CMAKE_BINARY_DIR}/${BUILD_DIR})

file(GLOB_RECURSE CORE_HDR src/*.h)
file(GLOB_RECURSE CORE_SRC src/*.cpp)

set(TARGET_SOURCES src/bindings.cc)

if (DEFINED EMSCRIPTEN)
    add_executable(module ${TARGET_SOURCES})
    
    set_target_properties(module PROPERTIES COMPILE_FLAGS "-O3 -msimd128")
    set_target_properties(module PROPERTIES LINK_FLAGS    "-O3 --bind -sWASM -sENVIRONMENT=web -sNO_EXIT_RUNTIME -sMODULARIZE -sEXPORTED_RUNTIME_METHODS=['addOnPostRun']")
    
    add_executable(typings ${TARGET_SOURCES})
    
    set_target_properties(typings PROPERTIES COMPILE_FLAGS "-O3 -msimd128")
    set_target_properties(typings PROPERTIES LINK_FLAGS    "-O3 --bind --embind-emit-tsd bin/module.d.ts -sEXPORTED_FUNCTIONS=['_free']")
else()
    add_library(module ${CORE_SRC} ${CORE_HDR})
endif()

add_custom_command(TARGET typings POST_BUILD
    COMMAND node scripts/post-build.cjs ${BUILD_DIR} module
)