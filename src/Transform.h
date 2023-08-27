#pragma once

#include "Vector.h"

#include <set>

#include "math.h"

class Transform
{
public:
    static const Transform* None;

public:
    Vector* Position = Vector::Make(0.0f, 0.0f, 0.0f);
    Vector* LocalPosition = Vector::Make(0.0f, 0.0f, 0.0f);
    Vector* Size = Vector::Make(1.0f, 1.0f, 1.0f);
    float Rotation = 0.0f;

    Transform* Parent = nullptr;
    std::set<Transform*> Children;

private:
    Transform(Transform* InParent = nullptr);
public:
    ~Transform();

public:
    Vector* GetPosition() const { return this->Position; }
    Vector* GetLocalPosition() const { return this->LocalPosition; }
    Vector* GetSize() const { return this->Size; }
    float GetRotation() const { return this->Rotation; }
    float GetRadianRotation() const { return this->Rotation * DEG2RAD; }
    float GetLocalRotation() const;
    float GetLocalRadianRotation() const;

public:
    void SetParent(Transform* InParent);
    void AddChild(Transform* InChild);
    void RemoveChild(Transform* InChild);
};