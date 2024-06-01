using System;
using System.Collections.Generic;

namespace cop.Models;

public partial class HealthProblem
{
    public int HealthProblemsNumber { get; set; }

    public string HealthProblemName { get; set; } = null!;

    public int Severity { get; set; }

    public string? Care { get; set; }

    public virtual ICollection<DiagnosedWith> DiagnosedWiths { get; set; } = new List<DiagnosedWith>();

    public virtual ICollection<StaffMember> Users { get; set; } = new List<StaffMember>();
}
