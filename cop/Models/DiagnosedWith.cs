using System;
using System.Collections.Generic;

namespace cop.Models;

public partial class DiagnosedWith
{
    public string ChildId { get; set; } = null!;
    public string KindergartenName { get; set; } = null!;

    public int HealthProblemsNumber { get; set; }

    public int Severity { get; set; }

    public string Care { get; set; } = null!;

    public virtual Child Child { get; set; } = null!;
    public virtual HealthProblem HealthProblem { get; set; } = null!;


public virtual HealthProblem HealthProblemsNumberNavigation { get; set; } = null!;
public virtual RegisterdTo CurrentAcademicYearNavigation { get; set; } = null!;
}
