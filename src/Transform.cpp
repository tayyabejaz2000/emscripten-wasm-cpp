#include "Transform.h"

const Transform* Transform::None = nullptr;

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