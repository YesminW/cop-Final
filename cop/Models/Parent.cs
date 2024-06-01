using System;
using System.Collections.Generic;

namespace cop.Models;

public partial class Parent
{
    public string UserId { get; set; } = null!;

    public virtual ICollection<Child> ChildParent1Navigations { get; set; } = new List<Child>();

    public virtual ICollection<Child> ChildParent2Navigations { get; set; } = new List<Child>();

    public virtual User User { get; set; } = null!;
}
