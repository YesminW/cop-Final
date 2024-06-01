using System;
using System.Collections.Generic;

namespace cop.Models;

public partial class StaffMember
{
    public string UserId { get; set; } = null!;

    public int KindergartenNumber { get; set; }

    public virtual Kindergarten KindergartenNumberNavigation { get; set; } = null!;

    public virtual User User { get; set; } = null!;

    public virtual ICollection<HealthProblem> HealthProblemsNumbers { get; set; } = new List<HealthProblem>();
}
