cmake_minimum_required(VERSION 3.27)

project(wasm)

add_definitions(-std=c++20)
set (CMAKE_CXX_STANDARD 20)

set(BUILD_DIR bin)

set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/${BUILD_DIR})
set(EXECUTABLE_OUTPUT_PATH ${CMAKE_BINARY_DIR}/${BUILD_DIR})

file(GLOB_RECURSE SOURCES src/*.cpp src/*.h)

add_executable(module ${SOURCES})

set_target_properties(module PROPERTIES COMPILE_FLAGS "-O3 -msimd128 -fno-exceptions")
set_target_properties(module PROPERTIES LINK_FLAGS    "-O3 --bind --closure 1 -sWASM -sENVIRONMENT=web -sNO_EXIT_RUNTIME -sMODULARIZE")

add_executable(typings ${SOURCES})

set_target_properties(typings PROPERTIES COMPILE_FLAGS "-O3 -msimd128 -fno-exceptions")
set_target_properties(typings PROPERTIES LINK_FLAGS    "-O3 --bind --closure 1 --embind-emit-tsd bin/index.d.ts -sEXPORTED_FUNCTIONS=['_free']")

add_custom_command(TARGET typings POST_BUILD
    COMMAND node scripts/post-build.cjs ${BUILD_DIR} module 
)