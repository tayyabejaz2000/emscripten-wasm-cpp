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
    void RecalculatePosition();
    void RecalculateLocalPosition();
    void UpdateChildrenPosition();

    void MoveTo(float x, float y, float z);
    void MoveOffset(float deltaX, float deltaY, float deltaZ);

    void RotateTo(float angle);
    void RotateOffset(float deltaAngle);

    void SetSize(float width, float height);
    void SetSizeOffset(float deltaW, float deltaH);

    void SetWidth(float width, bool lockAspectRatio = false);
    void SetHeight(float height, bool lockAspectRatio = false);
    void SetWidthOffset(float deltaW, bool lockAspectRatio = false);
    void SetHeightOffset(float deltaH, bool lockAspectRatio = false);

    Vector* TranslateLocal(Vector* InVec);
    Vector* TranslateWorld(Vector* InVec);
    Vector* RotateLocal(Vector* InVec);
    Vector* RotateWorld(Vector* InVec);
    Vector* TransformLocal(Vector* InVec);
    Vector* TransformWorld(Vector* InVec);

public:
    void SetParent(Transform* InParent);
    void AddChild(Transform* InChild);
    void RemoveChild(Transform* InChild);
};