#include "Transform.h"

Transform* Transform::Make(Transform* InParent)
{
    return new Transform(InParent);
}

Transform::Transform(Transform* InParent) : Parent(InParent)
{
    if (InParent) InParent->Children.insert(this);
}

Transform::~Transform()
{
    for (auto Child : this->Children) Child->Parent = this->Parent;
    if (this->Parent)
    {
        this->Parent->Children.erase(this);
        this->Parent->Children.insert(this->Children.begin(), this->Children.end());
    }
    delete this->Position;
    delete this->LocalPosition;
    delete this->Size;
}

void Transform::SetParent(Transform* InParent)
{
    if (this->Parent) this->Parent->Children.erase(this);
    if (InParent) InParent->Children.insert(this);
    this->Parent = InParent;
}

void Transform::AddChild(Transform* InChild)
{
    InChild->SetParent(this);
}

void Transform::RemoveChild(Transform* InChild)
{
    InChild->SetParent(nullptr);
}

float Transform::GetLocalRotation() const
{
    if (this->Parent) return this->Parent->Rotation - this->Rotation;
    else return this->Rotation;
}

float Transform::GetLocalRadianRotation() const
{
    if (this->Parent) return (this->Parent->Rotation - this->Rotation) * DEG2RAD;
    else return this->Rotation * DEG2RAD;
}

void Transform::RecalculatePosition()
{
    this->Position->CopyFrom(this->LocalPosition);
    if (this->Parent)
    {
        this->Position
            ->RotateZ(this->Parent->GetRadianRotation())
            ->Add(this->Parent->Position);
    }
    this->UpdateChildrenPosition();
}

void Transform::RecalculateLocalPosition()
{
    this->LocalPosition->CopyFrom(this->Position);
    if (this->Parent)
    {
        this->LocalPosition
            ->Sub(this->Parent->Position)
            ->RotateZ(-this->Parent->GetRadianRotation());
    }
    this->UpdateChildrenPosition();
}

void Transform::UpdateChildrenPosition()
{
    for (Transform* Child : this->Children)
        Child->RecalculatePosition();
}

void Transform::MoveTo(float x, float y, float z)
{
    this->Position->Set(x, y, z);
    this->RecalculateLocalPosition();
}

void Transform::MoveOffset(float deltaX, float deltaY, float deltaZ)
{
    this->Position->Add(deltaX, deltaY, deltaZ);
    this->RecalculateLocalPosition();
}

void Transform::RotateTo(float angle)
{
    this->Rotation = angle;
    this->UpdateChildrenPosition();
}

void Transform::RotateOffset(float deltaAngle)
{
    this->Rotation += deltaAngle;
    this->UpdateChildrenPosition();
}

void Transform::SetSize(float width, float height)
{
    this->Size->Set(abs(width), abs(height), 0.0f);
}

void Transform::SetSizeOffset(float deltaW, float deltaH)
{
    this->Size->Add(abs(deltaW), abs(deltaH), 0.0f);
}

void Transform::SetWidth(float width, bool lockAspectRatio)
{
    width = abs(width);
    if (lockAspectRatio) this->Size->Set(width, width / (this->Size->x / this->Size->y), 0.0f);
    else this->Size->x = width;
}

void Transform::SetHeight(float height, bool lockAspectRatio)
{
    height = abs(height);
    if (lockAspectRatio) this->Size->Set(height * (this->Size->x / this->Size->y), height, 0.0f);
    else this->Size->y = height;
}

void Transform::SetWidthOffset(float deltaW, bool lockAspectRatio)
{
    const float width = abs(this->Size->x + deltaW);
    if (lockAspectRatio) this->Size->Set(width, width / (this->Size->x / this->Size->y), 0.0f);
    else this->Size->x = width;
}

void Transform::SetHeightOffset(float deltaH, bool lockAspectRatio)
{
    const float height = abs(this->Size->y + deltaH);
    if (lockAspectRatio) this->Size->Set(height * (this->Size->x / this->Size->y), height, 0.0f);
    else this->Size->y = height;
}

Vector* Transform::TranslateLocal(Vector* InVec)
{
    return InVec->Copy()->Sub(this->Position);
}

Vector* Transform::TranslateWorld(Vector* InVec)
{
    return InVec->Copy()->Add(this->Position);
}

Vector* Transform::RotateLocal(Vector* InVec)
{
    Vector* Vec = InVec->Copy();
    if (this->Parent) Vec->RotateZ(-this->Parent->GetRadianRotation());
    return Vec;
}

Vector* Transform::RotateWorld(Vector* InVec)
{
    Vector* Vec = InVec->Copy();
    if (this->Parent) Vec->RotateZ(this->Parent->GetRadianRotation());
    return Vec;
}

Vector* Transform::TransformLocal(Vector* InVec)
{
    return InVec->Copy()->Sub(this->Position)->RotateZ(-this->GetRadianRotation());
}

Vector* Transform::TransformWorld(Vector* InVec)
{
    return InVec->Copy()->Add(this->Position)->RotateZ(this->GetRadianRotation());
}